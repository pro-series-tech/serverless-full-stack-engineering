import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Menu, Icon, Button, Input } from 'antd';
import AvatarSection from "components/sider/avatar";
import ImageCRUD from "components/image/crud"
import {
    switchModalVisibility
} from 'actions/crud';

const {
    Header, Content, Footer, Sider,
} = Layout;
class Home extends Component {
    state = {
        collapsed: false,
        searchText: ""
    };
    handleCollapse = (collapsed) => {
        this.setState({ collapsed });
    }
    handleSearch = (e) =>{
        this.setState({
            searchText: e.target.value
        });
    }
    handleAdd = ()=>{
        this.props.switchModalVisibility(true);
    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.handleCollapse}
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
                    <Header style={styles.header}>
                        <Button 
                            type="primary" 
                            shape="circle" 
                            size="large" 
                            icon="plus" 
                            onClick={this.handleAdd}
                        />
                        <Input.Search
                            style={styles.search}
                            placeholder="Search Image"
                            onChange={this.handleSearch}
                        />
                    </Header>
                    <Content style={{ margin: '0 16px' }}>

                    </Content>
                    <Footer style={styles.footer}>
                        some footer goes here
                    </Footer>
                </Layout>
                <ImageCRUD />
            </Layout>
        );
    }
}
const styles = {
    header: { 
        background: 'white', 
        padding: 5,
        paddingLeft: 10
    },
    footer: { 
        textAlign: 'center' 
    },
    search: {
        paddingLeft: 20,
        width: 300 
    },
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
    switchModalVisibility
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
