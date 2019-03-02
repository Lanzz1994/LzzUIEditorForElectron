import React from 'react';

export default WraperComponent=>class extends React.PureComponent<any>{
    callback={};

    componentDidUpdate(){
        for(let k in this.callback)this.callback[k]();
    }

    render(){
        return <WraperComponent CallbackAPI={
            {
                addCall:(name,fn)=>{this.callback[name]=fn},
                addCallOne:(name,fn)=>{this.callback[name]=()=>{fn();delete this.callback[name];}},
                remove:(name)=>{delete this.callback[name]},
                clear:()=>{Object.keys(this.callback).forEach((k)=>delete this.callback[k])}
            }
        } {...this.props}/>;
    }
}