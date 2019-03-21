import React from 'react';
import {connect} from 'dva';
import {Tree,Tabs,Card,Input,Button,message} from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import {TreeViewEditor,TreeView} from '@/components/TreeView';
import LinkedTree from '@/utils/LinkedTree';
import {IComponent,IComponentLibrary} from '@/access/DbEntity'
import {CommonDbBusiness,ComponentLibraryBusiness,ComponentBusiness} from '@/access/DbBusiness'


const TabPane=Tabs.TabPane,Meta=Card.Meta;

@connect(state => state)
export default class ComponentManager extends React.PureComponent<any> {
    state={
        dataSrouce:null,
        selectedNode:null,
        checkedNodes:[],
        ComponentLibrarys:[]
    }

    componentDidMount(){
        ComponentLibraryBusiness.GetAll().then((ComponentLibrarys)=>{
            this.setState({ComponentLibrarys});
        })
    }

    LoadComponentLibrary=async (library:IComponentLibrary)=>{
        if(library.Components&&library.Components.length){
            
        }
    }

    AddTreeNode=()=>{
        let selectedNode=this.state.selectedNode as LinkedTree;
        if(selectedNode){
            selectedNode.AddLast(new LinkedTree({Name:`add-${Math.random().toFixed(4)}`}));
            this.forceUpdate();
        } else message.info('请选择要附加的节点');
    }

    onTreeViewSelect=(selectedKeys,e)=>{
        this.setState({selectedNode:e.node.props.data});
    }

    onTreeViewCheck=(checkedKeys:string[], e)=>{
        let extraIDs=[];
        let data=e.node.props.data as LinkedTree;
        data.ForEach((current:LinkedTree)=>{
            if(checkedKeys.indexOf(current.ID)>-1) extraIDs.push(current.ID);
        });
        let checkedNodes=this.state.checkedNodes.filter((node:LinkedTree)=>extraIDs.indexOf(node.ID)===-1);
        checkedNodes.push(data);
        this.setState({checkedNodes});
    }

    render(){
        const {ComponentLibrarys,dataSrouce}=this.state;

        const tabs=ComponentLibrarys.map((library:IComponentLibrary)=><TabPane key={library.ID.toString()} className="lz-component-manager--preview-tab" tab={
            <React.Fragment>
                <Card
                    hoverable
                    style={{ width: 180 }}
                    cover={<div className="lz-component-manager--preview-image"><img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /></div>}
                >
                    <Meta title={library.Description.Name||'暂无标题'}/>
                </Card>
            </React.Fragment>}>
                <div className="lz-component-manager--component-list inline-block lz-panel">
                    <TreeView searchable onlyShowMatched labelField="Name" dataSrouce={dataSrouce} />
                </div>
                <div className="lz-component-manager--component-demo inline-block lz-panel">
                    
                </div>
            </TabPane>
        )

        return (
            <React.Fragment>
                <Tabs tabPosition="bottom" className="lz-component-manager">{tabs}</Tabs>
            </React.Fragment>
        )
    }
}