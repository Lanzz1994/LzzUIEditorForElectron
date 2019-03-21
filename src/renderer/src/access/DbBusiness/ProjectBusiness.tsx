import {Dexie} from 'dexie'
import Db from '../Database'
import {ITreeStructure} from '@/utils/DataStructure'
import {IPage,ITemplate,IProject,IAsset} from '../DbEntity'

export default class ProjectBusiness{

    static Get(ID:number):Dexie.Promise<IProject>{
        return Db.Projects.get(ID);
    }
    static GetAll():Dexie.Promise<IProject[]>{
        return Db.Projects.toArray();
    }
    static Add(project:IProject):Dexie.Promise<number>{
        return Db.Projects.add(project);
    }

    static Delete(ID:number):Dexie.Promise<void>{
        return Db.transaction("rw", Db.Pages,Db.Templates, Db.Projects, async ()=>{
            await Db.Pages.where("ProjectID").equals(ID).delete();
            await Db.Templates.where("ProjectID").equals(ID).delete();
            await Db.Projects.where("ID").equals(ID).delete();
        });
    }

    // PutPage(ID:number,page:IPage):number{
    //     return Db.Projects
    // }
    // PutTemplate(template:ITemplate):number{
    //     return 0;
    // }
    // PutAsset(asset:IAsset):number{
    //     return 0;
    // }
}