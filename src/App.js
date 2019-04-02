import React, { Component } from 'react';
import Layout from 'components/layout';
import 'antd/dist/antd.css';
import './App.css';

//import MyComponent from 'components/componentTemplate';

/*testing modules */
class App extends Component {
	render() {
		//return <MyComponent ownMessage='My Own message' />
		 return <Layout />;
	}
}

export default App;
