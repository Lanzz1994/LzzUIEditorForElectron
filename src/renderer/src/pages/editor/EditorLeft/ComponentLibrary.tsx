import React from 'react'
import {Select,Collapse,Divider,Button,Input,Icon, Col, Row} from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import { FluidInput } from '@/components/FluidInput'
import {IconFont} from '@/components/Common'
import {DragContainer} from '@/components/DragDrop'
import { IComponentLibrary, IComponent } from '@/access/DBEntity'
import {ComponentLibraryBusiness,ComponentBusiness} from '@/access/DbBusiness'

const Panel=Collapse.Panel,Option=Select.Option;

export default class ComponentLibrary extends React.PureComponent{
    state={
        openState:true,
        currentLibrary:null,
        HtmlComponents:[],
        ComponentLibraries:[],
        Components:[]
    }

    componentDidMount(){
        ComponentLibraryBusiness.GetAll().then((ComponentLibraries)=>{
            const HtmlLibrary=ComponentLibraries.shift();
            ComponentBusiness.GetByComponentLibrary(HtmlLibrary).then((HtmlComponents)=>{this.setState({HtmlComponents})});
            if(ComponentLibraries[0]) this.loadComponents(ComponentLibraries[0].Key,ComponentLibraries[0]);
            this.setState({ComponentLibraries});
        });
    }

    loadComponents=(currentLibrary:string,library:IComponentLibrary)=>{
        if(library){
            ComponentBusiness.GetByComponentLibrary(library).then((Components)=>{
                this.setState({currentLibrary:currentLibrary,Components});
            });
        } else this.setState({currentLibrary:currentLibrary,Components:[]});
    }

    getComponentBlock=(info:IComponent)=>{
        const desc=info.Description||{};
        const icon=desc.Image?
            (desc.Image.startsWith('IconFont')?<IconFont type={desc.Image}/>:<Icon type={desc.Image}/>)
            :<IconFont type="icon-xiaolian"/>;

        return (
            <Col key={info.Key} span={8} className="lz-control-source--component-info">
                <DragContainer>
                {icon}
                {desc.Name}
                </DragContainer>
            </Col>
        );
    }

    render(){
        const {ComponentLibraries,openState,currentLibrary,Components,HtmlComponents}=this.state;

        return (
            <React.Fragment>
                <div style={{paddingBottom:'10px',textAlign:'right'}}>
                    <FluidInput
                        openedHideLabel
                        direction="right"
                        openWidth="180px"
                        renderLabel={(toggle)=><Button icon="bars" size="small" onClick={()=>this.setState({openState:!openState})}/>}
                        renderContent={(toggle)=>
                            <Select size="small" style={{width:'100%'}} placeholder="选择UI框架" allowClear value={currentLibrary}
                                onChange={(value,option)=>this.loadComponents(value,value?option.props.data:null)}>
                                {ComponentLibraries.map((library:IComponentLibrary)=><Option key={library.Key} data={library}>{(library.Description||{}).Name||'-'}</Option>)}
                            </Select>
                        }
                        openState={openState}
                    />
                    <span style={{padding:5}}></span>
                    <FluidInput
                        openedHideLabel
                        openWidth="180px"
                        renderLabel={(toggle)=><Button icon="search" size="small" onClick={()=>this.setState({openState:!openState})}/>}
                        renderContent={(toggle)=>
                            <Input size="small" placeholder="搜索当前组件" suffix={<Icon type="search"/>}/>
                        }
                        openState={!openState}
                    />
                </div>
                <div className="lz-scroll-container">
                    <Scrollbars autoHide>
                    {
                        HtmlComponents.length?
                        <React.Fragment>
                            <div style={{padding:'0 10px'}}><Divider className="lz-control-source--divider">Html</Divider></div>
                            <Collapse bordered={false}>
                                {HtmlComponents.map((v,i)=>
                                <Panel key={i.toString()} header={v.Name}>
                                    <Row>{v.Children.map((block)=>this.getComponentBlock(block))}</Row>
                                </Panel>)}
                            </Collapse>
                        </React.Fragment>:null
                    }
                    {
                        Components.length?
                        <React.Fragment>
                            <div style={{padding:'0 10px'}}><Divider className="lz-control-source--divider">Antd</Divider></div>
                            <Collapse bordered={false}>
                                {Components.map((v,i)=>
                                <Panel key={i.toString()} header={v.Name}>
                                    <Row>{v.Children.map((block)=>this.getComponentBlock(block))}</Row>
                                </Panel>)}
                            </Collapse>
                        </React.Fragment>:null
                    }
                    </Scrollbars>
                </div>
            </React.Fragment>
        );
    }
}