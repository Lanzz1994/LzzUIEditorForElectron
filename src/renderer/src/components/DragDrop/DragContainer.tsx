import * as React from 'react';
import classNames from 'classnames';
import {DragSource, DragSourceConnector, DragSourceMonitor} from 'react-dnd';
import DragDropType from './DragDropType';
import {IContainerProps} from './interface'

class DragContainer extends React.PureComponent<IContainerProps> {
    componentDidMount() {
		const {connectDragPreview,dragPreview} = this.props;
		if(dragPreview&&connectDragPreview){
			connectDragPreview(dragPreview);
		}
	}

    render(){
        let {connectDragSource,children,containerProps={}}=this.props;
        const {className,...otherContainerProps}=containerProps;
        return connectDragSource(<div className={classNames("lz-drag-container",className)} {...otherContainerProps}>{children}</div>);   
    }
}

const SourceEvents = {
    canDrag:(props)=>{
        if(props.canDrag) return props.canDrag(props);
        return true;
    },
    isDragging:(props,monitor)=>{
        if(props.isDragging) return props.isDragging(props,monitor);
    },
	beginDrag:(props:any,monitor:DragSourceMonitor,component:any)=>{
        if(props.beginDrag) return props.beginDrag(props,monitor,component);
        return {};
	},
	endDrag:(props:any, monitor:DragSourceMonitor, component:any)=>{
		if(props.endDrag) props.endDrag(props,monitor,component)
	}
};

export default DragSource(
    DragDropType.DragDrop,
    SourceEvents,
    (connect:DragSourceConnector,monitor:DragSourceMonitor)=>({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    })
)(DragContainer)