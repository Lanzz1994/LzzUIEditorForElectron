import { IProject,IPage } from "../DBEntity";
import { ProjectBusiness, PageBusiness } from '../DbBusiness';

const Projects:{Project,Pages:IPage[]}[]=[{
    Project:{
        ID:0,
        Description:{Name:"项目1",Remark:"测试项目1"},
        Pages:[{
            Data:{ ID:0 },
            Children:[{
                Data:{ID:1}
            },{
                Data:{ID:2}
            }]
        },{
            Data:{ ID:3 },
            Children:[{
                Data:{ID:4}
            },{
                Data:{ID:5}
            }]
        }]
    },
    Pages:[
    //主页
    {
        ID:0,
        ProjectID:0,
        Name:'主页'
    },{
        ID:1,
        ProjectID:0,
        Name:'主页-子页面1'
    },{
        ID:2,
        ProjectID:0,
        Name:'主页-子页面2'
    },
    //页面1
    {
        ID:3,
        ProjectID:0,
        Name:'页面1'
    },{
        ID:4,
        ProjectID:0,
        Name:'页面1-子页面1'
    },{
        ID:5,
        ProjectID:0,
        Name:'页面1-子页面2'
    }]
}];

export default function GenerateProjectData(){
    Projects.forEach((project)=>{
        ProjectBusiness.Add(project.Project);
        project.Pages.forEach((page)=>PageBusiness.Add(page));
    })
}