import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Menu, Icon, Button } from 'antd';
import AvatarSection from "components/sider/avatar";
import {
} from 'lib/types';

const {
    Header, Content, Footer, Sider,
} = Layout;
class Home extends Component {
    state = {
        collapsed: false,
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <AvatarSection/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="picture" />
                            <span>Gallery</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="profile" />
                            <span>Profile</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        search bar goes here
                    </Header>
                    <Content style={{ margin: '0 16px' }}>

                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        some footer goes here
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
const styles = {

    col: {
        textAlign: "center"
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        credentials: state.authentication.credentials
    };
};
const mapDispatchToProps = {
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
