import * as React from "react"
import classNames from "classnames"
import DragContainer from "./DragContainer"
import DropContainer from "./DropContainer"

export interface DragDropContainerProps {
    dragProps:any
    dropProps:any
}

// 提供拖拽 和 放置 的容器
export default class DragDropContainer extends React.PureComponent<DragDropContainerProps> {
  render() {
    const {dragProps,dropProps,children}=this.props;
    const {className,...otherDragProps}=dragProps;
    return (
        <DragContainer otherContainerProps={{className:classNames("lz-dragdrop-container", className)}} {...otherDragProps}>
            <DropContainer {...dropProps}>{children}</DropContainer>
        </DragContainer>
    );
  }
}
