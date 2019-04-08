import React from 'react'
import { connect } from 'dva';
import {Select,Collapse,Divider,Button,Input,Icon, Col, Row} from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import {IconFont} from '@/components/Common'
import {TreeView} from '@/components/TreeView'
import LinkedTree from '@/utils/LinkedTree';
import { IProject, IPage } from '@/access/DBEntity'
import { PageBusiness } from '@/access/DbBusiness'

@connect(state => state)
export default class PageList extends React.PureComponent<any>{
    state={
        PageList:null
    }

    componentDidMount(){
        // let { Project }=this.props.InterfaceCore;
        // PageBusiness.GetByProjectID(Project).then((pages)=>{
        //     let PageList=new LinkedTree();
        //     PageList.ParseITreeStructure({Data:{},Children:pages});
        //     this.setState({PageList})
        // });
    }

    render(){
        const { InterfaceCore } = this.props;
        return (
            <div className="lz-control-source--page-list">
                <Button size="small" icon="plus" type="ghost">添加新的页面</Button>
                <Divider style={{margin:'10px 0',backgroundColor:'#ddd'}} />
                <TreeView searchable 
                    labelField="Name" 
                    searchInputProps={{size:'small'}}
                    renderTreeNodeTip={()=><span>title</span>} 
                    dataSrouce={InterfaceCore.Pages}
                    renderTreeNodeAction={()=><React.Fragment><Icon type="close"/></React.Fragment>} />
            </div>
        );
    }
}