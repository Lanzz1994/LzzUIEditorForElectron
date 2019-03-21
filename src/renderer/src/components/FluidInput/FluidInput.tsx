import React from 'react';
import classNames from 'classnames';

interface FluidInputProps{
    renderLabel:(toggleOpenState:(openState?:boolean)=>void)=>React.ReactNode,
    renderContent:(toggleOpenState:(openState?:boolean)=>void)=>React.ReactNode
    defaultOpen?:boolean,
    openedHideLabel?:boolean,
    openWidth?:string|number,
    openState?:boolean,
    direction?:"left"|"right",
    wraperProps?:any,
    changedOpenState?:(openState:boolean)=>void
}

export default class FluidInput extends React.PureComponent<FluidInputProps>{

    state={
        open:false,
        hideLabel:false
    }

    constructor(props){
        super(props);
        this.state.open=props.openState===undefined?props.defaultOpen:props.openState;
        this.state.hideLabel=props.openedHideLabel&&this.state.open;
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.openState!==undefined&&nextProps.openState!==this.state.open){
            this.toggleOpenState(nextProps.openState);
        }
    }

    toggleOpenState=(openState?:boolean)=>{
        let open=openState===undefined?!this.state.open:openState;
        if(open!==this.state.open){
            let hideLabel=this.props.openedHideLabel&&open;
            this.setState({open,hideLabel});
        }
    }

    toggleOpenStateLimit=(openState?:boolean)=>{
        if(this.props.openState===undefined){
            this.toggleOpenState(openState);
        }
    }
    
    render(){
        const {renderLabel,renderContent,openWidth,direction,wraperProps={}}=this.props;
        const {className,...otherProps}=wraperProps;
        const {open,hideLabel}=this.state;

        const label=hideLabel?null:<span className="lz-fluid-input--label" onClick={()=>this.toggleOpenStateLimit()}>{renderLabel(this.toggleOpenStateLimit)}</span>,
            isLeft=direction!=='right';
        return(
            <span className={classNames("lz-fluid-input",className)} {...otherProps}
                onTransitionEnd={({ propertyName }) => {
                if (propertyName === 'width'&&this.props.changedOpenState) {
                  this.props.changedOpenState(open);
                }
              }}>
                {isLeft?label:null}
                <span className="lz-fluid-input--content" style={{width:open?(openWidth||'100px'):'0'}}>{renderContent(this.toggleOpenStateLimit)}</span>
                {isLeft?null:label}
            </span>
        )
    }
}