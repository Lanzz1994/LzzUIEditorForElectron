import {ITreeStructure} from '@/utils/DataStructure'

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
    LayoutData:ITreeStructure[],
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
    Name:string,
    Description?:string,
    ProjectImage?:string,
    Pages?:ITreeStructure<IPage>[],
    Assets?:ITreeStructure<IAsset>[],
    Css?,
    Config?
}