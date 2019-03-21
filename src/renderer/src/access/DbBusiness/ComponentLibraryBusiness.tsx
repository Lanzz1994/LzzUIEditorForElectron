import {Dexie} from 'dexie'
import Db from '../Database'
import {IComponentLibrary} from '../DbEntity'

export default class ComponentLibraryBusiness{

    static Get(ID:number):Dexie.Promise<IComponentLibrary>{
        return Db.ComponentLibraries.get(ID);
    }
    static GetAll():Dexie.Promise<IComponentLibrary[]>{
        return Db.ComponentLibraries.toArray();
    }
    static Add(library:IComponentLibrary,key?:number):Dexie.Promise<number>{
        return Db.ComponentLibraries.add(library,key);
    }
    static Adds(libraries:IComponentLibrary[],keys?:number[]):Dexie.Promise<number>{
        return Db.ComponentLibraries.bulkAdd(libraries,keys);
    }

    // static Delete(ID:number):Dexie.Promise<void>{
    //     return Db.transaction("rw", Db.Components,Db.ComponentLibrarys, async ()=>{
    //         // await Db.Pages.where("ProjectID").equals(ID).delete();
    //         // await Db.Templates.where("ProjectID").equals(ID).delete();
    //         // await Db.Projects.where("ID").equals(ID).delete();
    //     });
    // }

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