//type
//export type TreeStructure={Data:any,Children:TreeStructure[]};

export interface ITreeStructure<T={}>{
    Data:T,
    Children:ITreeStructure<T>[]
}