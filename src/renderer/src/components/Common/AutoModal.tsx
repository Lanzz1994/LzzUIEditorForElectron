import React from 'react'
import {Modal} from 'antd'

export interface ModalProps{
    dispatch:any,
    dispathType:string,
    visibleKey:string,
    ModalContent?:any,
    ModalProps?:any,
}

export default class AutoModal extends React.PureComponent<ModalProps>{
    
    onCancel=()=>{
        let {dispathType,visibleKey}=this.props;
        let updateStates={};updateStates[visibleKey]=false;
        this.props.dispatch({type:dispathType,updateStates});
    }

    render(){
        let {ModalProps,ModalContent}=this.props;
        return(<Modal onCancel={this.onCancel} footer={null} {...ModalProps}>{ModalContent}</Modal>)
    }
}