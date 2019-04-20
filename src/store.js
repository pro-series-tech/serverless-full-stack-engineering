/**
 * This script exports the Redux store which will be provided to the application component.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* external imports */
import { 
    compose, 
    createStore, 
    combineReducers, 
    applyMiddleware 
} from 'redux';
import thunk from 'redux-thunk';
/* local imports (all our reducers) */
import * as reducers from 'reducers';


/* Use ES6 object literal shorthand syntax to define the object shape.
 combine all reducers into one big store */
const rootReducer = combineReducers({
    ...reducers
});
/* composer enhancers, if Redux Tools are present use it, otherise use
the imported composer object. For more information about Redux Tools: http://extension.remotedev.io */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* create store and export */
export default createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk))
);