import {Dexie} from 'dexie'
import Db from '../Database'
import {IComponent,IComponentLibrary} from '../DbEntity'

export default class ComponentBusiness{

    static Get(ID:number):Dexie.Promise<IComponent>{
        return Db.Components.get(ID);
    }
    static GetAll():Dexie.Promise<IComponent[]>{
        return Db.Components.toArray();
    }
    static GetByComponentLibrary(library:IComponentLibrary):Dexie.Promise<any[]>{
        return Db.Components.where("ComponentLibraryKey").equals(library.Key).toArray((list)=>{
            let components=[];
            if(library.Components.length){
                components=library.Components.map((info)=>({
                    Name:info.Name,
                    Children:list.filter((v)=>(info.Keys||[]).indexOf(v.Key)>-1)
                }));
            }
            return components;
        });
    }

    static Add(component:IComponent):Dexie.Promise<number>{
        return Db.Components.add(component);
    }

    static Adds(components:IComponent[],keys?:number[]):Dexie.Promise<number>{
        return Db.Components.bulkAdd(components,keys);
    }

    static Delete(ID:number):Dexie.Promise<void>{
        return Db.Components.delete(ID);
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