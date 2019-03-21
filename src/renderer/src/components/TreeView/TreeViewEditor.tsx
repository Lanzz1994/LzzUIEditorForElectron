import React from 'react';
import {Button,message} from 'antd';
import {TreeView} from '@/components/TreeView';
import LinkedTree from '@/utils/LinkedTree';

export interface TreeViewEditorProps{
    dataSrouce?:LinkedTree,
    treeViewProps?:any,
    searchInputProps?:any,
    onAddTreeNode?:(selectedNode:LinkedTree,resolve,reject)=>void
}

export default class TreeViewEditor extends React.PureComponent<TreeViewEditorProps> {
    state={
        selectedNode:null,
        checkedNodes:[],
        shallowChecedkNodes:[]
    }

    AddTreeNode=()=>{
        let {onAddTreeNode,dataSrouce}=this.props;
        if(onAddTreeNode){ 
            new Promise((resolve,reject)=>{
                onAddTreeNode(this.state.selectedNode||dataSrouce,resolve,reject);
            })
            .then(()=>{this.forceUpdate()})
            .catch(()=>{message.warning('添加节点异常')});
        }
    }

    RemoveCheckedNodes=()=>{
        let {shallowChecedkNodes}=this.state;
        if(shallowChecedkNodes.length){
            shallowChecedkNodes.map((node:LinkedTree)=>node.RemoveSelf());
            this.forceUpdate();
        }else message.info('请选择要删除的节点');
    }

    onTreeViewSelect=(selectedKeys,e)=>{
        this.setState({selectedNode:e.node.props.data});
    }

    onTreeViewCheck=(checkedKeys:string[], e)=>{
        let {dataSrouce}=this.props, checkedNodes=[], shallowChecedkNodes=[];
        //deep
        dataSrouce.ForEach((node:LinkedTree)=>{
            if(checkedKeys.indexOf(node.ID)>-1) checkedNodes.push(node);
        });
        //shallow
        dataSrouce.ForEach((node:LinkedTree)=>{
            if(checkedKeys.indexOf(node.ID)>-1) shallowChecedkNodes.push(node);
        },(node:LinkedTree)=>{
            return checkedKeys.indexOf(node.ID)>-1;
        });
        this.setState({checkedNodes,shallowChecedkNodes});
    }

    render(){
        const {dataSrouce,treeViewProps,searchInputProps}=this.props;

        return (
            <TreeView dataSrouce={dataSrouce} searchable onlyShowMatched
                searchInputProps={searchInputProps}
                treeProps={{
                    checkable:true,
                    onSelect:this.onTreeViewSelect,
                    onCheck:this.onTreeViewCheck
                }}
                handleWraper={
                    <React.Fragment>
                        <div className="lz-treeview--batch">
                            <Button size="small" onClick={this.AddTreeNode} icon="plus" style={{marginRight:10}}>添加</Button>
                            <Button size="small" onClick={this.RemoveCheckedNodes} icon="minus">删除</Button>
                        </div>
                    </React.Fragment>
                }
                {...treeViewProps}
            />
        )
    }
}