
export const myAction = date => dispatch => {
    dispatch({
        type: 'SET_DATE',
        payload: date
    });
};
