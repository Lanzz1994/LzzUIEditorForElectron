import {UpdateStates} from '@/utils/ModelsUtils'

export default {
    state:{
        ComponentManagerVisible:true,
        Project:null,
        Pages:[],

        ComponentLibraries:[],
        HtmlComponents:[],
        Components:[],

        Templates:[]
    },
    reducers:{
        UpdateStates
    },
    effects:{
        *InitInterface({ payload }, { call, put }){
            
        }
    }
}