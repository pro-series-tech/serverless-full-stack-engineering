

/**
 * This script exports the index export for all reducers.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */

/* local imports (all our reducers) */
import crud from 'reducers/crud';
import global from 'reducers/global';
import gallery from 'reducers/gallery';
import authentication from 'reducers/authentication';
import myReducer from 'reducers/reducerTemplate';

/* export components from a single entry point*/
export {
    crud,
    global,
    gallery,
    authentication,
    myReducer
}