import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authentication from 'reducers/authentication.js';

// Use ES6 object literal shorthand syntax to define the object shape
const rootReducer = combineReducers({
 authentication
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk))
);