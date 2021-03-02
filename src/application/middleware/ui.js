import * as uiActions from "../actions/ui";
import * as providerActions from '../actions/provider';

const appLoadedFlow = ({ log }) => ({ dispatch }) => next => action => {
    next(action);

    if (action.type === uiActions.APP_INIT) {
        log('app init');
        dispatch(providerActions.connectToProvider);
    }
}

export default [
    appLoadedFlow
]