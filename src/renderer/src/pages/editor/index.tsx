import React from 'react';
import {connect} from 'dva';

@connect(state => state)
export default class GUIEditor extends React.PureComponent<any> {

    render(){
        console.log(this.props.DataCore.EditProject);

        return <div onClick={()=>{location.href="../"}}>返回</div>
    }
}