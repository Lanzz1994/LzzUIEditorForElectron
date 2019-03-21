import * as React from 'react';
import {Tree,Input,Button,Popover,Empty} from 'antd';
import {Scrollbars} from 'react-custom-scrollbars';
import classNames from 'classnames';
import LinkedTree from '@/utils/LinkedTree';

const TreeNode=Tree.TreeNode,Search=Input.Search;

export interface TreeViewProps {
    labelField:string,
    valueField?:string,
    dataSrouce?:LinkedTree,
    
    searchable?:boolean,
    onlyShowMatched?:boolean,
    searchEmpty?:string|React.ReactNode,

    handleWraper?:React.ReactNode,

    searchInputProps?:any,
    treeProps?:any,
    renderTreeNodeAction?:(data:any)=>React.ReactNode,
    treeNodeTipProps?:any,
    renderTreeNodeTip?:(data:any)=>React.ReactNode,

    empty?:string|React.ReactNode,
    nodeEmpty?:string|React.ReactNode,

    renderTreeNode?:(data:any,treeNode:React.ComponentClass,searchState)=>React.ReactNode
}

export default class TreeView extends React.Component<TreeViewProps>{

    state={
        expandedKeys: [],
        currentExpandedKeys:[],
        autoExpandParent: true,

        //search
        searching:false, //在搜索时不能编辑、触发拖拽
        searchValue:null,
    }

    //============= method ===================
    SearchChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const searchValue=e.target.value;

        let {valueField,labelField,dataSrouce}=this.props, expandedKeys=[],searching=searchValue!=="";
        if(searching){
            dataSrouce.ForEach((current:LinkedTree)=>{
                if(current.HasParent){
                    let title=current.Data[labelField]||'';
                    if(title.indexOf(searchValue)>-1) expandedKeys.push(valueField?current.Data[valueField]:current.ID);
                }
            });
        }else expandedKeys=this.state.currentExpandedKeys;
        this.setState({searchValue,expandedKeys,searching,autoExpandParent:searching});
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            currentExpandedKeys:expandedKeys,
            autoExpandParent: false
        });
    }

    onDrop = (info) => {
        const dragData=info.dragNode.props.data as LinkedTree,
            dropData=info.node.props.data as LinkedTree, 
            dropPos = info.node.props.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
        let isMove=true;
        if(dropPosition===0){
            dragData.MoveToLast(dropData);
        }else if(dropPosition===-1){
            isMove=(dropData.Prev||{ID:''}).ID!==dragData.ID;
            dragData.MoveToBefore(dropData);
        }else{
            isMove=(dropData.Next||{ID:''}).ID!==dragData.ID
            dragData.MoveToAfter(dropData);
        }
        if(isMove) this.forceUpdate();
    }

    render(){
        let {valueField,labelField,searchable,renderTreeNodeTip,onlyShowMatched,searchEmpty,treeProps,searchInputProps={},
            handleWraper,dataSrouce,empty,nodeEmpty,renderTreeNodeAction,renderTreeNode,treeNodeTipProps}=this.props;
        let {searchValue,searching,autoExpandParent,expandedKeys}=this.state;

        const {searchClassName,...otherSearchProps}=searchInputProps;

        const treeSearch=searchable?<Search className={classNames("lz-treeview--search",searchClassName)} placeholder="Search" {...otherSearchProps} value={searchValue} onChange={this.SearchChange}/>:null;
        let treeNodes=null,hasData=dataSrouce&&dataSrouce.Children.length;
        if(hasData){
            treeNodes=dataSrouce.ForEachStartLeaf((current, children) => {
                if(current.HasParent){
                    let title=current.Data[labelField]||'';

                    //搜索状态
                    let searchState={searching,searchValue,isMatch:false};
                    if(searching){
                        const index=title.indexOf(searchValue);
                        if(searchValue&&index>-1){
                            searchState.isMatch=true;
                            const beforeStr = title.substr(0, index),
                                afterStr = title.substr(index + searchValue.length);
                            title = (<React.Fragment>{beforeStr}<span style={{ color: '#f50' }}>{searchValue}</span>{afterStr}</React.Fragment>);
                        }else{
                            if(onlyShowMatched&&children.length===0) return null;
                        }
                    }

                    title=title||nodeEmpty||'';
                    if(renderTreeNodeTip) title=<Popover {...treeNodeTipProps} content={<div onClick={(e)=>{e.stopPropagation()}}>{renderTreeNodeTip(current)}</div>}>{title}</Popover>;
                    return renderTreeNode?renderTreeNode(current,TreeNode,searchState):
                (<TreeNode key={valueField?current.Data[valueField]:current.ID} data={current} title={<React.Fragment>{title||nodeEmpty||''}{renderTreeNodeAction?<span className="lz-treeview--node-action" onClick={(e)=>{e.stopPropagation()}}>{renderTreeNodeAction(current)}</span>:null}</React.Fragment>}>{children}</TreeNode>);
                } else return children;
            })
        } else treeNodes=searching?(searchEmpty||<Empty description="暂无匹配项"/>):(empty||<Empty description="暂无数据"/>);
        
        return (
            <div className="lz-treeview">
                {treeSearch}
                {handleWraper}
                <div className="lz-treeview--nodes-wraper">
                    <Scrollbars autoHide autoHideTimeout={1000}>
                    {
                        hasData?
                        <Tree className="lz-treeview--nodes"
                            draggable
                            blockNode
                            autoExpandParent={autoExpandParent} 
                            expandedKeys={expandedKeys}
                            onExpand={this.onExpand}
                            onDrop={this.onDrop}
                            {...treeProps}
                        >{treeNodes}</Tree>
                        :<div className="lz-treeview-empty">{treeNodes}</div>
                    }
                    </Scrollbars>
                </div>
            </div>
        )
    }
}