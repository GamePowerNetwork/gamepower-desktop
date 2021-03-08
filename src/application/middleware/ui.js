import * as uiActions from "../actions/ui";
import * as providerActions from '../actions/provider';


const appInitFlow = ({ api, log }) => ({ dispatch }) => next => action => {
    next(action);

    if (action.type === uiActions.APP_INIT) {
        log('app init');
        // Create menubar
        dispatch(uiActions.createMenuBar);

        // Connect to the blockchain
        dispatch(providerActions.connectToProvider);
    }
}

const createMenubarFlow = ({ api, log }) => ({ dispatch }) => next => action => {
    next(action);

    if (action.type === uiActions.CREATE_MENUBAR) {
        // Create menubar
        api.menubar.createMenuBar();
    }
}

export default [
    appInitFlow,
    createMenubarFlow
]