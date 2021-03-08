import * as uiActions from '../actions/ui';

const initialState = {
    loading: true,
    loadingMessage: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case (uiActions.SET_LOADING_ON):
        case (uiActions.SET_LOADING_OFF):
            return { ...state, loading: action.payload };
        case (uiActions.SET_LOADING_MESSAGE):
            return { ...state, loadingMessage: action.payload };
        default:
            return state;
    }
}