/**
 * This script exports the properties type for the applciation components.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
import PropTypes from 'prop-types';

/* prop types definitions and utils */
export const localPropTypes = {
    credentials: PropTypes.shape({
        expired: PropTypes.bool,
        expireTime: PropTypes.instanceOf(Date),
        accessKeyId: PropTypes.string,
        sessionToken: PropTypes.string,
        params: PropTypes.object,
        data: PropTypes.object
    })
}
/* prop types mocking data to share among testing specs */
export const localPropTypesMockData = {
    credentials:{
        expired: false,
        expireTime: new Date(),
        accessKeyId: 'mock accessKeyId',
        sessionToken: 'mock sessionToken',
        params: {mock: 'params'},
        data: {mock: 'data'}
    }
}