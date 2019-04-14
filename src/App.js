/**
 * This script exports the Application component.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* external imports */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
/* local imports */
import Layout from 'components/layout';
import './App.css';

/* remove comment for testing of component template */
//import MyComponent from 'components/componentTemplate';

/*testing modules */
class App extends Component {
    /**
     * Renders the layout component.
     * @returns {React.Component}
     */
	render() {
		//return <MyComponent ownMessage='My Own message' />
		return <Layout />;
	}
}
/* export react component */
export default App;
