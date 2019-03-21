//============== ITreeStructure ===================
export interface ITreeStructure<T={}>{
    Data:T,
    Children?:ITreeStructure<T>[]
}
export function LoopITreeStructure<T>(treeData:ITreeStructure<T>,handle:(data:T,parent?:ITreeStructure)=>ITreeStructure,parent?:ITreeStructure):ITreeStructure{
    parent=handle(treeData.Data,parent);
    if(treeData) (treeData.Children||[]).forEach((v)=>LoopITreeStructure(v,handle,parent));
    return parent;
}
export function LoopITreeStructureLeaf<T>(treeData:ITreeStructure<T>,handle:(data:T,children:ITreeStructure[])=>ITreeStructure):ITreeStructure{
    let children=treeData?treeData.Children.map((v)=>LoopITreeStructureLeaf(v,handle)):null;
    return handle(treeData.Data,children);
}

export function LoopChildren(treeData:any,handle:(data:any,parent?:any)=>any,parent?:any):any{
    parent=handle(treeData,parent);
    if(treeData) treeData.Children.forEach((v)=>LoopITreeStructure(v,handle,parent));
    return parent;
}