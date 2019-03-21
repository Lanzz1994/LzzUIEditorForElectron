import Dexie from 'dexie';
import Db from '@/access/Database'
import { ITreeStructure } from '@/utils/DataStructure';
import {GenerateTreeDataByID} from '../_utils/utils'

export default class  CommonDbBusiness{
    static async GetTreeData<T>(treeDatas:ITreeStructure<T>[],tableName:string){
        let result:ITreeStructure[]=[];
        const table=Db[tableName] as Dexie.Table<T,number>;
        await table.toArray((list)=>{
            result=treeDatas.map((treeData)=>GenerateTreeDataByID(treeData,list))
        });
        return result;
    }
}