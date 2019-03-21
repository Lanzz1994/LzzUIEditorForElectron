import {ITreeStructure,LoopITreeStructure} from '@/utils/DataStructure'

export function GenerateTreeDataByID(treeData:ITreeStructure,list:any[]):ITreeStructure{
    return LoopITreeStructure(treeData,(data:any,parent?:ITreeStructure)=>{
        let childTreeData:ITreeStructure={Data:data.InsideData?data:list.find((row:any)=>row.ID===data.ID)||{},Children:[]};
        if(parent) parent.Children.push(childTreeData);
        return childTreeData;
    });
}