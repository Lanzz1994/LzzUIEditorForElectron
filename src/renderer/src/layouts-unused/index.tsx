import React from 'react'
import {Spin} from 'antd'
import './index.less'

export type BasicLayoutComponent<P> = React.SFC<P>;

export interface BasicLayoutProps extends React.Props<any> {
  history?: History;
  location?: Location;
}

const BasicLayout: BasicLayoutComponent<BasicLayoutProps> = props => {
  return (
    <Spin wrapperClassName="app-wraper">{props.children}</Spin>
  );
};

export default BasicLayout;
