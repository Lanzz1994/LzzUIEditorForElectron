import {ITreeStructure} from './DataStructure'
import {GenerateUUID} from './UUID'

//=================== Common Method =====================

function setFirst(tree:LinkedTree,target:LinkedTree):void{
    if(target._firstChild&&target.Length>1){
        tree._next=target._firstChild;
        target._firstChild._prev=tree;
        target._firstChild=tree;
    }else{
        target._firstChild=tree; 
        target._lastChild=tree;
    }
    if(tree._prev)tree._prev=null;
}

function setLast(tree:LinkedTree,target:LinkedTree):void{
    if(target._lastChild&&target.Length>1){
        target._lastChild._next=tree;
        tree._prev=target._lastChild;
        target._lastChild=tree;
    }else{
        target._firstChild=tree;
        target._lastChild=tree;
    }
    if(tree._next)tree._next=null;
}

function setAfter(tree:LinkedTree,target:LinkedTree):void{
    if(target._parent){
        let next= target._next;
        tree._prev=target;
        if(next){
            tree._next=next;
            next._prev=tree;
            target._next=tree;
        }else{
            target._next=tree;
            target._parent._lastChild=tree;
        }
    }
}

function setBefore(tree:LinkedTree,target:LinkedTree):void{
    if(target._parent){
        let prev= target._prev;
        tree._next=target;
        if(prev){
            tree._prev=prev;
            prev._next=tree;
            target._prev=tree;
        }else{
            target._prev=tree;
            target._parent._firstChild=tree;
        }
    }
}

//从链表里移除指定节点
function cutLinked(tree:LinkedTree):void{
    if(tree._parent){
        //处理第一个节点
        if(tree._prev){
            tree._prev._next=tree._next;
        }else{
            tree._parent._firstChild=tree._next;
            if(tree._next){tree._next._prev=null}
        }

        //处理最后一个节点
        if(tree._next){
            tree._next._prev=tree._prev;
        }else{
            tree._parent._lastChild=tree._prev;
            if(tree._prev){tree._prev._next=null}
        }
        
        tree._prev=null;
        tree._next=null;
        tree._parent=null;
    }
}

function insert(tree:LinkedTree,target:LinkedTree):void{
    tree._parent=target;
    target._children.push(tree);
}

function remove(tree:LinkedTree):void{
    if(tree._parent){
        var index=tree._parent._children.findIndex((v)=>v._id==tree._id);
        if(index>-1){
            tree._parent._children.splice(index,1);
            cutLinked(tree);
        }
    }
}

function copy<P>(tree:LinkedTree):LinkedTree<P>{
    return tree.IsLeaf?new LinkedTree<P>(Object.assign({},tree.Data) as P):
    eachTreeChildren(tree,(current:LinkedTree,children:LinkedTree[])=>{
        let copyTree:LinkedTree<P>=new LinkedTree<P>(Object.assign({},current.Data) as P);
        if(!current.IsLeaf){
            copyTree._children=children;
            copyTree._firstChild=children[0];
            copyTree._lastChild=children[children.length-1];
            children.map(function(v,i){
                v._parent=copyTree;
                let next=children[i+1];
                if(next){
                    v._next=next;
                    next._prev=v;
                }
            });
        }
        return copyTree;
    });
}

function eachTreeChildren(tree:LinkedTree,handle:(current:LinkedTree|null,children:any[],prev?:any)=>any,prev?:any,breakFn?:(current:LinkedTree|null)=>boolean):any{
    let subTree:LinkedTree|null=tree._firstChild,children:any[]=[],isNext=true;
    if(breakFn)isNext=!breakFn(tree);
    while(isNext&&subTree){
        prev=eachTreeChildren(subTree,handle,prev,breakFn);
        subTree = subTree._next;
        if(prev) children.push(prev);
    }
    return handle(tree,children,prev);
}

function eachTreeParent(tree:LinkedTree,handle:(current:LinkedTree,parent?:any)=>any,parent?:any,breakFn?:(current:LinkedTree|null)=>boolean):void{
    let subTree:LinkedTree|null=tree._firstChild;
    parent=handle(tree,parent);

    let isNext=true;
    if(breakFn) isNext=!breakFn(tree);
    while(isNext&&subTree){
        eachTreeParent(subTree,handle,parent,breakFn);
        subTree=subTree._next;
    }
}

function RecursionHandle(tree:ITreeStructure,handle:(data:any,parent?:any)=>any,parent?:any){
    let index=0;
    let subTree:ITreeStructure=tree.Children[index];
    parent=handle(tree,parent);
    while(subTree){
        RecursionHandle(subTree,handle,parent);
        subTree=tree.Children[++index];
    }
}

//冒泡操作
function BubbleHandle(tree:LinkedTree,handle){
    let current:LinkedTree|null=tree,state=true;
    while(current!=null&&state){
        state=handle(current);
        current=current._parent;
    }
}

export default class LinkedTree<P={}> {
    //=================== Fields =====================
    _id:string;
    _parent:LinkedTree|null=null;
    _prev:LinkedTree|null=null;
    _next:LinkedTree|null=null;
    _children:LinkedTree[]=[];
    _firstChild:LinkedTree|null=null;
    _lastChild:LinkedTree|null=null;
    Data:P;

    //=================== Properties =====================
    get ID(){return this._id;}
    get Parent(){return this._parent;}
    get HasParent(){return this._parent?true:false}
    get Children(){return this._children;}
    get Prev(){return this._prev;}
    get Next(){return this._next;}
    get IsLeaf(){return this._children.length===0;}
    get Length(){return this._children.length;}

    //=================== Constructor =====================
    constructor(data?:P,parent?:LinkedTree){
        this._id=GenerateUUID();
        if(data) this.Data=data;
        if(parent) parent.AddLast(this);
    }

    //=================== Add =====================
    /**
     * Adds the specified new tree at the start of children of this
     */
    AddFirst(tree:LinkedTree):void{
        insert(tree,this);
        setFirst(tree,this);
    }

    /**
     * Adds the specified new tree at the end of children of this
     */
    AddLast(tree:LinkedTree):void{
        insert(tree,this);
        setLast(tree,this);
    }

    /**
     * Adds the new tree before the specified existing trees 
     * that filtering from 'fn' parameter in children of this
     */
    // AddBefore(tree:LinkedTree,fn):void{}
    // AddAfter(tree:LinkedTree,fn):void{}

    //=================== Move =====================
    private _moveToChildren(tree:LinkedTree){
        if(tree._parent){
            remove(tree);
        }
    }

    private _moveToSibling(tree:LinkedTree,target:LinkedTree){
        if(target._parent){
            remove(tree);
            insert(tree,target._parent);
        }
    }

    /**
     * 
     */
    MoveToFirst(target:LinkedTree):void{
        this._moveToChildren(this);
        target.AddFirst(this);
    }
    MoveToLast(target:LinkedTree):void{
        this._moveToChildren(this);
        target.AddLast(this);
    }
    MoveToBefore(target:LinkedTree):void{
        this._moveToSibling(this,target);
        setBefore(this,target);
    }
    MoveToAfter(target:LinkedTree):void{
        this._moveToSibling(this,target);
        setAfter(this,target);
    }
    MoveToReplace(target:LinkedTree):void{
        this._moveToSibling(this,target);
        setAfter(this,target);
        remove(target);
    }
    
    //=================== Copy =====================
    /**
     * Copies 'this' to the specified tree, 
     * which means getted a new tree of containing 'this' structure 
     * to append to the start of childen of the specified tree
     */
    CopyToFirst(target:LinkedTree):LinkedTree<P>{
        let tree:LinkedTree<P>=copy<P>(this);
        target.AddFirst(tree);
        return tree;
    }

    /**
     * Copies 'this' to the specified tree, 
     * which means getted a new tree of containing 'this' structure 
     * to append to the end of childen of the specified tree
     */
    CopyToLast(target:LinkedTree):LinkedTree<P>{
        let tree:LinkedTree<P>=copy<P>(this);
        target.AddLast(tree);
        return tree;
    }
    
    CopyToBefore(target:LinkedTree):LinkedTree<P>{
        let tree:LinkedTree<P>=copy<P>(this);
        tree.MoveToBefore(target);
        return tree;
    }

    CopyToAfter(target:LinkedTree):LinkedTree<P>{
        let tree:LinkedTree<P>=copy<P>(this);
        tree.MoveToAfter(target);
        return tree;
    }

    CopyToReplace(target:LinkedTree):LinkedTree<P>{
        let tree:LinkedTree<P>=copy<P>(this);
        tree.MoveToAfter(target);
        remove(target);
        return tree;
    }

    //=================== Remove =====================
    RemoveSelf():void{
        remove(this);
    }
    
    RemoveFirst():void{
        if(this._firstChild){
            this._firstChild.RemoveSelf();
        }
    }

    RemoveLast(){
        if(this._lastChild){
            this._lastChild.RemoveSelf();
        }
    }

    Clear(){
        if(!this.IsLeaf){
            this._children=[];
            this._firstChild=null;
            this._lastChild=null;
        }
    }

    //=================== ParseData =====================
    /**
     * format: {Data:{},Children:[ {Data:{},Children:[]},{Data:{},Children:[]} ]}
     */
    ToITreeStructure(format?:(data:P)=>ITreeStructure<P>,toJSON?:boolean){
        const result= eachTreeChildren(this,(current:LinkedTree<P>,childen:any[])=>{
            return {Data:format?format(current.Data):current.Data,Children:childen};
        });
        return toJSON?JSON.stringify(result):result;
    }

    /**
     * treeDataStr:linkedtree object: {Data:{},Children:[ {Data:{},Children:[]},{Data:{},Children:[]} ]}
     * cover:indicates the new data whether replacing original data,
     *       if 'false' the new data being appended to the end of root's children
     * format:the specified data converts to the specified generics (type of LinkedTedd.Data)
     */
    ParseITreeStructure(treeData:string|ITreeStructure<P>,cover?:boolean,format?:(data:any)=>P){
        try{
            if(typeof treeData==='string') treeData=JSON.parse(treeData) as ITreeStructure<P>;
            if(cover) this.Clear();
            let root=this;
            RecursionHandle(treeData,(current:any,parent?:LinkedTree)=>{
                let data:P=format?format(current.Data):current.Data as P;
                if(parent){
                    return new LinkedTree(data,parent);
                }else{
                    root.Data=data;
                    return root;
                }
            });
        }catch(e){
            throw new Error('faild valid format string in parameter data');
        }
    }

    //=================== Other =====================
    ForEach(fn:(current:LinkedTree,parent:any)=>any,breakFn?:(current:LinkedTree)=>boolean):any{
        return eachTreeParent(this,fn,null,breakFn);
    }

    ForEachStartLeaf(fn:(current:LinkedTree,childen:any[],prev?:any)=>any,breakFn?:(current:LinkedTree)=>boolean):any{
        return eachTreeChildren(this,fn,null,breakFn);
    }

    Find(fn:(tree:LinkedTree)=>boolean,all:boolean):LinkedTree[]|undefined{
        let result:LinkedTree[]=[];
        eachTreeParent(this,(current:LinkedTree)=>{
            if(fn(current))result.push(current);
        });
        if(result.length>0)return result;
    }

    ContainsParent(ID:string){
        let contains=false;
        if(this._parent){
            BubbleHandle(this._parent,(current:LinkedTree)=>{
                contains = current.ID===ID;
                return !contains;
            });
        }
        return contains;
    }

    ResetID(){
        this._id=GenerateUUID();
    }
}