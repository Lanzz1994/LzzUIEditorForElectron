import {ITreeStructure} from '@/utils/DataStructure'

// 类型为 ITreeStructure 的字段，属性 Data 里不要使用 InsideData（程序使用关键字段） 作为字段名，{Data:{InsideData:true/false||undefined},Children:[]}
//======== Common ===========
export interface ITreeData {
    ID?:number,
    InsideData?:boolean
}

export interface Description{
    Name?:string,
    Image?:string,
    Remark?:string
}

//======== Project ===========

export interface IAsset{
    ID?:number,
    Name:string,
    Type:string,
    Path:string
}

export interface ITemplate{
    ID?:number,
    ProjectID?:number,
    Name:string,
    LayoutData?:ITreeStructure[],
    CssIDs?:[]
}

export interface IPage{
    ID?:number,
    ProjectID:number,
    Name:string
    LayoutData?:ITreeStructure
    Templates?:ITreeStructure[]
    Config?:any
}

export interface IProject{
    ID?:number,
    Description:Description,
    Pages?:ITreeStructure<IPage>[],
    Assets?:ITreeStructure<IAsset>[],
    Css?:any,
    Config?:any
}

//======== Component ===========

export interface IComponentLibrary{
    ID?:number,
    Key:string,
    Description:Description,
    Components?:{Name:string,Keys:any[]}[],
    Config?:any
}

export interface IComponentProp extends Description {
    PropName:string,
    DefaultValue:any,
    EditorInfo:any
    //EditorInfo:PropEditorInfo
}

export interface IComponentSlot extends Description{
    Key:string
}

export interface IComponent {
    ID?:number,
    ComponentLibraryKey:string,
    Key:string,
    Props?:any,
    Slots?:IComponentSlot[],
    Children?:IComponent[],
    Description?:Description,//Image:IconFont...，以 IconFont 开头用 IconFont 控件，没有默认 Icon
    Config?:any,
    CodeTemplate?:string,
    Remark?:string
}

export interface IComponentEditor{
    ID,
    Key:string,
    Description,
    Config:any
}