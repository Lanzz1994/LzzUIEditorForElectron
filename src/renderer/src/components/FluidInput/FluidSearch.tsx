import * as React from 'react';
import {Icon,AutoComplete,Input} from 'antd';
import classNames from 'classnames';

export interface FluidSearchProps{
    direction?:"left"|"right",
    icon?:React.ReactNode,
    autoCompleteProps?:any,
    autoHide?:boolean,
    defaultOpen?:boolean,
    openWidth?:string|number,
    onChange?:(value)=>void
}

export default class FluidSearch extends React.PureComponent<FluidSearchProps> {

    state={
        open:false,
        value:''
    }
    input:Input

    constructor(props:FluidSearchProps){
        super(props);
        this.state.open=props.defaultOpen;
    }

    toggleOpenState=()=>{
        this.setState({open:true},()=>{
            this.input.focus()
        });
    }

    onBlur=()=>{
        if(this.props.autoHide===false&&this.state.value) return;
        this.setState({
            open:false,
            value:''
        })
    }

    onChange=(value)=>{
        this.setState({value});
        if(this.props.onChange) this.props.onChange(value);
    }

    render(){
        const {autoCompleteProps={},direction,icon,openWidth}=this.props;
        let {open,value}=this.state;
        const isLeft=direction!=='right';

        let iconNode=<span className="lz-fluid-search--icon">{icon||(<Icon type="search" key="Icon" />)}</span>;

        return (
            <span className="lz-fluid-search" onClick={this.toggleOpenState}>
                {isLeft?iconNode:null}
                <AutoComplete allowClear {...autoCompleteProps} 
                    className={classNames('default',autoCompleteProps.className,open?'open':'close')} 
                    style={{width:open?(openWidth||'100px'):'0'}}
                    value={value} onChange={this.onChange}>

                    <Input className='lz-fluid-search--input' 
                        ref={node => {this.input = node}} 
                        onBlur={this.onBlur}
                    />
                </AutoComplete>
                {isLeft?null:iconNode}
            </span>
        )
    }
}