/**
 * This script renders the application into the #root div element of the DOM.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* external imports */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
/* local imports */
import './index.css';
import App from './App';
import store from './store'
import * as serviceWorker from './serviceWorker';

/* render the app into the HTML #root div element, see public/index.html
to understand exactly where it will be rendered */
ReactDOM.render(
/* wrap the application into a Redux store provider */
<Provider store={store}>
    <App />
</Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
