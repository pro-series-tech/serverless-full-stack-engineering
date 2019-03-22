import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import global from 'reducers/global';
import authentication from 'reducers/authentication';
import crud from 'reducers/crud';
import gallery from 'reducers/gallery';

// Use ES6 object literal shorthand syntax to define the object shape
const rootReducer = combineReducers({
    global,
    authentication,
    crud,
    gallery
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk))
);