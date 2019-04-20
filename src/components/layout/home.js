/**
 * This script exports the Home layout component.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* external imports */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, Layout, Input} from 'antd';
/* local imports */
import {Avatar} from 'components/sider';
import { localPropTypes } from 'lib/prop-types';
import { ImageCRUD, Gallery } from 'components/image'
import { switchModalVisibility } from 'actions/crud';
/* destruct layout to optain header, content and sider components */
const {
    Header, Content, Sider,
} = Layout;
/* component initial state constant */
const initialState = {
    collapsed: false,
    searchText: ''
};
class Home extends Component {
    /* set the instance initial state as initialState clone */
    state = {...initialState}
    /**
     * The collapse event handler for the left panel.
     * @param  {boolean} collapsed
     */
    handleCollapse = (collapsed) => {
        this.setState({ collapsed });
    }
    /**
     * Handler for search input textbox text change event.
     * @param  {Event} e
     */
    handleSearch = (e) =>{
        this.setState({
            searchText: e.target.value
        });
    }
    /**
     * Handler for the add image button. This will switch the visibility
     * of the CRUD modal.
     */
    handleAddImage = ()=>{
        this.props.switchModalVisibility(true);
    }
	/**
	 * Renders the Home(gallery and left panel) component.
	 * @returns {React.Component}
	 */
    render() {
        /* render the component */
        return (
            /* the Layout component allows easy arrange of component in the
            web application. */
            <Layout style={styles.layoutContainer}>
                {/* Sider component automatically handles the space taken on the left
                panel and provides collapsible functionality. */}
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.handleCollapse}
                > 
                    {/* Custom avatar component which wraps other ant design components 
                    in order to provide user picture */}
                    <Avatar/>
                </Sider>
                {/* Sublayout component to arrange the main section of the web app. This
                layout encapsulates the */}
                <Layout>
                    {/* Header component containing the add image button and 
                    search bar component. */}
                    <Header style={styles.header}>
                        <Button
                            icon='plus'
                            size='large'
                            type='primary'
                            shape='circle'
                            style={styles.addButton}
                            onClick={this.handleAddImage}
                        />
                        <Input.Search
                            style={styles.search}
                            placeholder='Search Image'
                            onChange={this.handleSearch}
                        />
                    </Header>
                    {/* The content container */}
                    <Content style={styles.content}>
                        <Gallery searchText={this.state.searchText}/>
                    </Content>
                </Layout>
                {/* the image CRUD component renders a Modal which is hidden by default.
                When Add image button is clicked, the visibility is changed in the redux
                state and the modal shows up. */}
                <ImageCRUD />
            </Layout>
        );
    }
}
/* component styles */
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
/* PropTypes for data type validation */
Layout.propTypes = {
    credentials: localPropTypes.credentials
}
/* wrap the form before passing it out to redux connect */
const mapStateToProps = (state, ownProps) => {
    return {
        credentials: state.authentication.credentials
    };
};
/* redux map dispatch functions to properties */
const mapDispatchToProps = {
    switchModalVisibility
};
/* wrap this component into a redux component */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
