import * as socketActions from '../actions/socket';

const initialState = {
    socket: null,
    error: null,
    message: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case socketActions.CONNECT_SUCCESS:
            return { ...state, socket: action.payload, error: null };
        case socketActions.CONNECT_FAILURE:
            return { ...state, socket: null, error: action.payload };
        case socketActions.RECEIVE_MESSAGE:
            return { ...state, message: {data: action.payload.data, timestamp: action.payload.timestamp} };
        default:
            return state;
    }
}

export default reducer;