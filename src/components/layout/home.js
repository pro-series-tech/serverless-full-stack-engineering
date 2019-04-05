import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, Layout, Input} from 'antd';
import Gallery from 'components/image/gallery'
import ImageCRUD from 'components/image/crud'
import AvatarSection from 'components/sider/avatar';
import { switchModalVisibility } from 'actions/crud';

const {
    Header, Content, Sider,
} = Layout;

const initialState = {
    collapsed: false,
    searchText: ''
};

class Home extends Component {
    state = initialState;
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
            <Layout style={styles.layoutContainer}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.handleCollapse}
                >
                    <AvatarSection/>
                </Sider>
                <Layout>
                    <Header style={styles.header}>
                        <Button
                            type='primary'
                            shape='circle'
                            size='large'
                            icon='plus'
                            onClick={this.handleAdd}
                            style={styles.addButton}
                        />
                        <Input.Search
                            style={styles.search}
                            placeholder='Search Image'
                            onChange={this.handleSearch}
                        />
                    </Header>
                    <Content style={styles.content}>
                        <Gallery searchText={this.state.searchText}/>
                    </Content>
                </Layout>
                <ImageCRUD />
            </Layout>
        );
    }
}
const styles = {
    layoutContainer:{
        minHeight: '100vh'
    },
    header: { 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        padding: 5
    },
    content:{
        overflow: 'auto',
        margin: '16px',
        height: '80vh'
    },
    addButton:{
        minWidth: 40
    },
    search: {
        paddingLeft: 20,
        width: 300 
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
