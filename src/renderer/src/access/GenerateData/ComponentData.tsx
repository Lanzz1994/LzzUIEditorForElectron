import Db from '../Database'
import { IComponentLibrary, IComponent } from '../DBEntity';
import {ComponentLibraryBusiness,ComponentBusiness} from '../DbBusiness'

const ComponentLibraries:{[propName:string]:{Library:IComponentLibrary,Components:IComponent[]}}={
    Html:{
        Library:{
            ID:0,
            Key:'Html',
            Description:{Name:'Html'},
            Components:[{
                Name:'常规',
                Keys:["div","span","i"]
            },{
                Name:'排版',
                Keys:["h1","h2","h3"]
            },{
                Name:'媒体',
                Keys:["img","video"]
            }]
        },
        Components:[
        //常规
        {
            ComponentLibraryKey:'Html',
            Key:'div',
            Description:{Name:'div'}
        },{
            ComponentLibraryKey:'Html',
            Key:'span',
            Description:{Name:'span'}
        },{
            ComponentLibraryKey:'Html',
            Key:'i',
            Description:{Name:'i'}
        },
        //排版
        {
            ComponentLibraryKey:'Html',
            Key:'h1',
            Description:{Name:'h1'}
        },
        {
            ComponentLibraryKey:'Html',
            Key:'h2',
            Description:{Name:'h2'}
        },
        {
            ComponentLibraryKey:'Html',
            Key:'h3',
            Description:{Name:'h3'}
        },

        //媒体
        {
            ComponentLibraryKey:'Html',
            Key:'img',
            Description:{Name:'img'}
        },{
            ComponentLibraryKey:'Html',
            Key:'video',
            Description:{Name:'video'}
        }]
    },
    Antd:{
        Library:{
            ID:1,
            Key:'Antd',
            Description:{Name:'Ant Design'},
            Components:[{
                Name:"通用",
                Keys:["Button","Icon","Typography"]
            },{
                Name:"布局",
                Keys:["Row","Col","Layout"]
            },{
                Name:'导航',
                Keys:[]
            },{
                Name:'数据录入',
                Keys:[]
            },{
                Name:'数据展示',
                Keys:[]
            },{
                Name:'反馈',
                Keys:[]
            },{
                Name:'其他',
                Keys:[]
            }]
        },
        Components:[
            //Common
            {
                ComponentLibraryKey:'Antd',
                Key:'Button',
                Description:{ Name:'按钮' }
            },{
                ComponentLibraryKey:'Antd',
                Key:'Icon',
                Description:{ Name:'图标' }
            },{
                ComponentLibraryKey:'Antd',
                Key:'Typography',
                Description:{ Name:'排版' },
                Children:[{
                    ComponentLibraryKey:'Antd',
                    Key:'Typography.Text',
                    Description:{ Name:'文字' }
                },{
                    ComponentLibraryKey:'Antd',
                    Key:'Typography.Title',
                    Description:{ Name:'标题' }
                },{
                    ComponentLibraryKey:'Antd',
                    Key:'Typography.Paragraph',
                    Description:{ Name:'段落' }
                }]
            },
            //Layout
            {
                ComponentLibraryKey:'Antd',
                Key:'Row',
                Description:{ Name:'栅格行' }
            },{
                ComponentLibraryKey:'Antd',
                Key:'Col',
                Description:{ Name:'栅格列' }
            },{
                ComponentLibraryKey:'Antd',
                Key:'Layout',
                Description:{ Name:'布局' },
                Children:[{
                    ComponentLibraryKey:'Antd',
                    Key:'Layout.Header',
                    Description:{ Name:'头部' }
                },{
                    ComponentLibraryKey:'Antd',
                    Key:'Layout.Sider',
                    Description:{ Name:'侧边栏' }
                },{
                    ComponentLibraryKey:'Antd',
                    Key:'Layout.Content',
                    Description:{ Name:'内容' }
                },{
                    ComponentLibraryKey:'Antd',
                    Key:'Layout.Footer',
                    Description:{ Name:'底部' }
                }]
            }]
    }
};

export default function GenerateComponentData(){
    Promise.all(['Html','Antd'].map((key)=>Db.transaction("rw", Db.Components,Db.ComponentLibraries, async ()=>{
        await ComponentLibraryBusiness.Add(ComponentLibraries[key].Library);
        await ComponentBusiness.Adds(ComponentLibraries[key].Components)
    })))
}