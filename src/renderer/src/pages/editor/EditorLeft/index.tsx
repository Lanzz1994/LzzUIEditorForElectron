import * as React from 'react';
import { Tabs} from 'antd';
import ComponentLibrary from './ComponentLibrary'
import PageList from './PageList'
import './styles'

const TabPane = Tabs.TabPane;

export default class EditorLeft extends React.PureComponent {

    componentDidMount(){
        // ComponentLibraryBusiness.GetAll().then((ComponentLibraries)=>{
        //     this.setState({ComponentLibraries});
        // });

        //GenerateComponentData();
    }

    render() {

        return (
            <div className="lz-control-source">
                <Tabs defaultActiveKey="0" tabPosition="left">
                    <TabPane tab="页面" key="0" className="lz-control-source--pages">
                        <PageList />
                    </TabPane>
                    <TabPane tab="组件" key="1" className="lz-control-source--components">
                        <ComponentLibrary />
                    </TabPane>
                    <TabPane tab="组合" key="2">
                        AssambleControls
                    </TabPane>
                    <TabPane tab="动效" key="3">
                        Motions
                    </TabPane>
                </Tabs>
            </div>);
    }
}