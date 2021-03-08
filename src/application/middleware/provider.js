import * as providerActions from "../actions/provider";
import * as uiActions from '../actions/ui';

const connectProviderFlow = ({api}) => ({dispatch}) => next => async (action) => {
    next(action);

    if (action.type === providerActions.CONNECT_PROVIDER) {
        try {
            dispatch(uiActions.setLoadingMessage("Connecting to blockchain"));
            dispatch(uiActions.setLoading(true));
            const connection = await api.provider.connect(/*"wss://gamepower.io"*/);
            dispatch(providerActions.connectProviderSuccess(connection));
            dispatch(uiActions.setLoading(false));
        } catch (error) {
            dispatch(providerActions.connectProviderFailure(error));
        }
    }
}

const callGamerpowerExtrinsicFlow = ({api, log}) => ({getState, dispatch}) => next => async (action) => {
    next(action);

    if (action.type === providerActions.CALL_GAMEPOWER_EXTRINSIC) {
        try {
            const account = getState().keyring.activeAccount;
            const connection = getState().provider.connection;
            api.provider.gamepower(dispatch, connection, account, action.payload);
        } catch (error) {
            //dispatch(connectProviderFailure(error));
        }
    }
}

const callGamerpowerStorageFlow = ({api, log}) => ({getState, dispatch}) => next => async (action) => {
    next(action);

    if (action.type === providerActions.CALL_GAMEPOWER_STORAGE) {
        try {
            const account = getState().keyring.activeAccount;
            const connection = getState().provider.connection;
            api.provider.queryGamepower(dispatch, connection, account);
        } catch (error) {
            log(error);
        }
    }
}

const callSystemExtrinsicFlow = ({api, log}) => ({getState, dispatch}) => next => async (action) => {
    next(action);

    if (action.type === providerActions.CALL_SYSTEM_EXTRINSIC) {
        try {
            log("Extrinsic: SYSTEM");
            const connection = getState().provider.connection;
            api.provider.system(dispatch, connection, action.payload);
        } catch (error) {
            log("ERROR: ", error);
            //dispatch(connectProviderFailure(error));
        }
    }
}

export default [
    connectProviderFlow,
    callGamerpowerExtrinsicFlow,
    callSystemExtrinsicFlow,
    callGamerpowerStorageFlow,
]