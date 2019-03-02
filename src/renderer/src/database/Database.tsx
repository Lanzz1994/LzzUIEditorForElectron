import Dexie from 'dexie'
import {IProject,IPage,ITemplate, IAsset} from './DBEntity'

class Database extends Dexie {
    public Projects!:Dexie.Table<IProject, number>
    public Pages!:Dexie.Table<IPage,number>
    public Templates!:Dexie.Table<ITemplate,number>
    public Assets!:Dexie.Table<IAsset,number>

    public constructor() {
        super("Database");
        this.version(1).stores({
            Projects:"++ID,Name,Description,ProjectImage,Pages,Assets,Css,Config",//Pages,Assets is tree [{Data:{PageName,PageID},Children:[]}],所有涉及分类都按此来划分
            Pages:"++ID,ProjectID,Name,,LayoutData,Templates,Config",
            Templates:"++ID,ProjectID,Name,LayoutData,CssIDs",
            Css:"++ID,ProjectID,CssText",

            Assets:"++ID,Name,Type,Path",
        });
    }
}

let db=new Database();

export default db;
