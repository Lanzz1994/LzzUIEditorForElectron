import * as React from 'react';
import classNames from 'classnames'
import { DropTarget, DropTargetConnector, DropTargetMonitor } from 'react-dnd'
import DragDropType from './DragDropType'
import {IContainerProps} from './interface'


class DropContainer extends React.PureComponent<IContainerProps> {
    componentDidUpdate(prevProps) {
        if (!prevProps.isOver && this.props.isOver) {
          // You can use this as enter handler
        }
    
        if (prevProps.isOver && !this.props.isOver) {
          // You can use this as leave handler
        }
    
        if (prevProps.isOverCurrent && !this.props.isOverCurrent) {
          // You can be more specific and track enter/leave
          // shallowly, not including nested targets
        }
    }
    
    render(){
    const {connectDropTarget,children,containerProps={}} = this.props;
    const {className,...otherContainerProps}=containerProps;
		return connectDropTarget(<div className={classNames("lz-drop-container",className)} {...otherContainerProps}>{children}</div>);
	}
}

const TargetEvents = {
    canDrop:(props,monitor)=>{
        if(props.canDrop) return props.canDrop(props,monitor);
        return true;
    },
    hover:(props:any, monitor:DropTargetMonitor, component:any)=>{
		if(props.hover) props.hover(props,monitor,component);
	},
	drop:(props:any,monitor:DropTargetMonitor,component:any)=>{
		if(props.drop) props.drop(props,monitor,component);
	}
}

// 放置容器的外壳
// 提供拖拽时 放置流程入口，不参与样式
export default DropTarget(
    DragDropType.DragDrop, 
    TargetEvents, 
    (connect:DropTargetConnector, monitor:DropTargetMonitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true })
    })
)(DropContainer)