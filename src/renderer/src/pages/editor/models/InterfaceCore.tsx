import { message } from 'antd'
import LinkedTree from '@/utils/LinkedTree';
import { UpdateStates } from '@/utils/ModelsUtils'
import { ProjectBusiness,PageBusiness } from '@/access/DbBusiness';


export default {
    state:{
        ComponentManagerVisible:true,
        Project:null,

        Pages:new LinkedTree(),

        ComponentLibraries:[],
        HtmlComponents:[],
        Components:[],

        Templates:[]
    },
    reducers:{
        UpdateStates
    },
    effects:{
        *InitInterfaceAsync({ payload }, { call, put }){
            let updateStates={Pages:new LinkedTree()};
            yield ProjectBusiness.Get(parseInt(payload.ProjectID)).then(async Project=>{
                await PageBusiness.GetByProjectID(Project).then((pages)=>{
                    updateStates["Pages"].ParseITreeStructure({Data:{},Children:pages})
                });

            }).catch(()=>message.warning('未获取到项目信息'));

            yield put({ type:"UpdateStates",updateStates});
        }
    }
}