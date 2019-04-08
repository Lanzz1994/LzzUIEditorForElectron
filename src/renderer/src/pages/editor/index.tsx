import React from 'react'
import {connect} from 'dva'
import {Spin,Layout,Button,Drawer, message} from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import {DragDropBoard} from '@/components/DragDrop'
import { ProjectBusiness } from '@/access/DbBusiness';
import EditorLeft from './EditorLeft'
import './style/index.less'

const {Header,Sider,Content}=Layout;

@connect(state => state)
export default class GUIEditor extends React.PureComponent<any> {
    state={
        ComponentManagerVisible:true,
    }

    componentDidMount(){
        const ProjectID=location.hash.split('?')[1].split('=')[1];
        if(ProjectID){
            // ProjectBusiness.Get(parseInt(ProjectID)).then(Project=>{
            //     this.props.dispatch({type:'InterfaceCore/UpdateStates',updateStates:{Project}});
                
            //     this.setState({EditorLeft:<EditorLeft />})
                
            // }).catch(()=>message.warning('未获取到项目信息'))
            this.props.dispatch({
                type:"InterfaceCore/InitInterfaceAsync",
                payload:{ ProjectID }
            });
        }
    }

    render(){
        const {ComponentManagerVisible}=this.state;
        return (
            <React.Fragment>
                {/* <Spin> */}
                <Layout className="lz-ui-wraper">
                    <Header className="lz-ui-header">
                        <Button onClick={()=>{location.href="../"}}>返回</Button>&nbsp;
                        <Button>撤消</Button>&nbsp;
                        <Button>恢复</Button>
                        <span> 现在代码实现必须保证每个功能都是最干净的粒度，没有半点多余</span>
                    </Header>
                    <DragDropBoard>
                        <Layout className="lz-ui-work-area">
                            <Sider className="lz-ui-left" width="294"><EditorLeft /></Sider>
                            <Layout>
                            <Scrollbars autoHide>
                                <Content className="lz-ui-center-wraper">
                                    <div className="lz-ui-center">i
                                        <div>Grid-Rule</div>
                                    </div>
                                </Content>
                                </Scrollbars>
                            </Layout>
                            <Sider className="lz-ui-right" width="294">
                                
                            </Sider>
                        </Layout>
                    </DragDropBoard>
                </Layout>
            {/* </Spin> */}

            </React.Fragment>
        )
    }
}