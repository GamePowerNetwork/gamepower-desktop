import * as providerActions from '../actions/provider';

const initialState = {
    connection: null,
    isLoaded: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case providerActions.CONNECT_PROVIDER_SUCCESS:
            return { connection: action.payload, isLoaded: true, error: null };
        default:
            return state;
    }
}

export default reducer;