import Dexie from 'dexie'
import {IProject,IPage,ITemplate, IAsset,IComponent, IComponentLibrary} from './DBEntity'

class Database extends Dexie {
    public Projects!:Dexie.Table<IProject, number>
    public Pages!:Dexie.Table<IPage,number>
    public Templates!:Dexie.Table<ITemplate,number>

    public ComponentLibraries!:Dexie.Table<IComponentLibrary,number>
    public Components!:Dexie.Table<IComponent,number>

    public Assets!:Dexie.Table<IAsset,number>

    public constructor() {
        super("Database");
        this.version(1).stores({
            Projects:"++ID,Description,Pages,Assets,Css,Config",
            Pages:"++ID,ProjectID,Name,LayoutData,Templates,Config",
            Templates:"++ID,ProjectID,Name,LayoutData,CssIDs",
            Css:"++ID,ProjectID,CssText",

            ComponentLibraries:"++ID,Key,Description,Components,Editable,Config",
            Components:"++ID,ComponentLibraryKey,Key,Props,Description,CodeTemplate,Config,Remark", // 根据主要属性衍生的二级或者无关紧要属性放到Config里，较为灵活。如Props衍生DefaultProps
            // ComponentEditors:"++ID,Description,Key,Config", // 需要将数据列转换为键值对的形式

            Assets:"++ID,Name,Type,Path",
        });
    }
}

const db=new Database();

export default db;
