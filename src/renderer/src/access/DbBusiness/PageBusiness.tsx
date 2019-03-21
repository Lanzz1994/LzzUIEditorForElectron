import {Dexie} from 'dexie'
import Db from '../Database'
import { ITreeStructure } from '@/utils/DataStructure';
import {GenerateTreeDataByID} from '../_utils/utils'
import {IProject,IPage} from '../DbEntity'


export default class PageBusiness{

    static GetByProjectID(project:IProject):Dexie.Promise<ITreeStructure<IPage>[]>{
        return Db.Pages.where("ProjectID").equals(project.ID).toArray((pages)=>{
            return project.Pages.map((info)=>GenerateTreeDataByID(info,pages)) as ITreeStructure<IPage>[];
        });
    }

    static Add(page:IPage):Dexie.Promise<number>{
        return Db.Pages.add(page);
    }

    static Delete(ID:number):Dexie.Promise<void>{
        return Db.Pages.delete(ID);
    }
}