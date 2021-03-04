import * as uiActions from "../actions/ui";
import * as providerActions from '../actions/provider';


const appInitFlow = ({ api, log }) => ({ dispatch }) => next => action => {
    next(action);

    if (action.type === uiActions.APP_INIT) {
        log('app init');
        // Create menubar
        api.menubar.createMenuBar();

        // Connect to the blockchain
        dispatch(providerActions.connectToProvider);
    }
}

export default [
    appInitFlow
]