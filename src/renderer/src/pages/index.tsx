import React from 'react';
import { List, Card, Icon, Modal, Input, Button, Spin, message } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { IconFont, UploadImage } from '@/components/Common';
import Db from '@/database/Database'
import {IProject} from '@/database/DbEntity'
import './index.less';

const Meta = Card.Meta;

export default class Index extends React.Component<any> {
  state = {
    Projects:[],
    ProjectName:'',
    ProjectDesc:'',
    PageWidth:'',
    PageHeight:'',
    CreateModalVisible: false,
    loading:true
  }

  constructor(props){
    super(props);
  }

  componentDidMount(){
    //Db.Projects
    // .toArray().then((Projects)=>{
    //   this.setState({Projects,loading:false});
    // }).catch(()=>{
    //   message.warning('项目列表加载异常');
    //   this.setState({loading:false})
    // });
  }

  //======= createModal ========
  createModalOK = () => {this.createModalClear();}
  createModalCancel = () => {this.createModalClear();}
  //关闭创建项目窗口，根据参数刷新项目列表
  createModalClear = async (args?:{msg:string,reload?:boolean}) => {
    let changes={ 
      ProjectName:'',
      ProjectDesc:'',
      CreateModalVisible:false
    };
    if(args){
      message.info(args.msg);
      if(args.reload) await Db.Projects.toArray(projs=>{
        changes["Projects"]=projs;
      });
    }
    this.setState(changes);
  }
  //创建一个项目
  createProject = () => {
    Db.Projects.add({
      Name:this.state.ProjectName,
      Description:this.state.ProjectDesc,
      ProjectImage:""
    }).then(key=>this.createModalClear({msg:'添加成功',reload:true}))
    .catch(()=>this.createModalClear({msg:'添加项目信息异常'}));
  }
  //删除项目操作
  deleteProject=(proj:IProject)=>{
    Modal.confirm({
      title: '删除提示',
      content: '删除后项目所用的资源和项目的关联将无法恢复，是否删除',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        console.log(proj);
        //删除项目下的独立子资源（项目页面，专属模板等）
        // Db.transaction("rw",Db.Pages,Db.Projects,Db.Projects,async ()=>{
          
        // });
      }
    });
  }

  //======= projectEditor ========
  projectSetting=()=>{}
  projectEdit=(EditProject)=>{
    location.href='./editor?id='+EditProject.id;
  }
  projectMore=()=>{}

  render() {
    let {Projects,ProjectName,ProjectDesc,loading}=this.state;
    let projs=Projects.map((project:IProject,index)=>
      <Card key={index}
        cover={<img src={project.ProjectImage||"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}/>}
        actions={[
          <Icon type="setting" />, 
          <Icon type="edit" onClick={()=>{this.projectEdit(project)}}/>, 
          <Icon type="delete" onClick={()=>{this.deleteProject(project)}}/>]} size="small" hoverable={true}
      >
        <Meta title={project.Name||'项目名称'} description={project.Description||'项目描述...'} />
      </Card>
    );
    const welcomeList = [
      {
        title: '新建项目',
        avatar: <IconFont type="icon-entrance-add" />,
        description: '新建一个项目',
        onClick: () => {
          this.setState({ CreateModalVisible: true });
        },
      },
      {
        title: '导入项目',
        avatar: <IconFont type="icon-import2" />,
        description: '通过 Project.json 导入项目',
        onClick: () => {},
      },
      {
        title: '编辑教程',
        avatar: <IconFont type="icon-entrance-guide2" />,
        description: '编辑器使用教程',
        onClick: () => {},
      },
      {
        title: '案例下载',
        avatar: <IconFont type="icon-entrance-guide3" />,
        description: '制作完成的项目案例',
        onClick: () => {},
      },
      {
        title: '开源地址',
        avatar: <IconFont type="icon-entrance-link2" />,
        description: '编辑器的开源地址',
        onClick: () => {},
      }
    ];

    return (
      <React.Fragment>
        <div className="editor-entrance">
            <div className="introduction">
              <Card
                cover={
                  <div style={{ textAlign: 'center', padding: '16px 16px 0 16px' }}>
                    <img
                      style={{ width: 200 }}
                      alt="example"
                      src={require('../assets/editor-logo.png')}
                    />
                  </div>
                }
                bordered={false}
                style={{ borderRadius: 0 }}
              >
                <Meta
                  title={<div style={{ textAlign: 'center', fontSize: 18 }}>欢迎使用</div>}
                  description={<div style={{ textAlign: 'center' }}>版本：1.0</div>}
                />
              </Card>
              <List
                itemLayout="horizontal"
                dataSource={welcomeList}
                bordered={false}
                split={false}
                size="small"
                className="editor-welcome-list"
                renderItem={item => (
                  <List.Item onClick={item.onClick}>
                    <List.Item.Meta
                      avatar={item.avatar}
                      title={<a href="#">{item.title}</a>}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </div>
            <Spin wrapperClassName="projects" tip="加载中..." spinning={loading}>
              <Scrollbars autoHide>{projs}</Scrollbars>
            </Spin>
            
        </div>
        <Modal
          title="新建项目"
          maskClosable={false}
          visible={this.state.CreateModalVisible}
          onCancel={this.createModalCancel}
          footer={null}
          className="entrance-create-modal"
        >
          <Input placeholder="项目名称" className="create-form" value={ProjectName} onChange={e=>{this.setState({ProjectName:e.target.value})}}/>
          <Input placeholder="项目描述" className="create-form" value={ProjectDesc} onChange={e=>{this.setState({ProjectDesc:e.target.value})}}/>
          <div className="create-form">
            <UploadImage uploadProps={{ style: { width: '100%' } }} uploadTitle="上传项目图片" />
          </div>
          <Button
            type="primary"
            style={{ width: '100%' }}
            onClick={this.createProject}
          >
            新建
          </Button>
        </Modal>
      </React.Fragment>
    );
  }
}