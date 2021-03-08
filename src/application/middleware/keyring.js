import * as keyringActions from "../actions/keyring";
import * as providerActions from "../actions/provider";
import * as uiActions from '../actions/ui';

const initKeyringFlow = ({api, log}) => ({dispatch}) => next => async (action) => {
    next(action);

    if (action.type === keyringActions.INIT_KEYRING) {
        try {
            dispatch(uiActions.setLoadingMessage("Initializing Accounts"));
            dispatch(uiActions.setLoading(true));
            await api.keyring.initialize();
            dispatch(keyringActions.initKeyringSuccess());
            dispatch(uiActions.setLoading(false));
        } catch (error) {
            log("ERROR: ", error);
            dispatch(keyringActions.initKeyringFailure(error));
        }
    }
}

const loadAccountsFlow = ({api, log}) => ({dispatch}) => next => async (action) => {
    next(action);

    if (action.type === keyringActions.LOAD_ACCOUNTS) {
        try {
            dispatch(uiActions.setLoadingMessage("Loading Accounts"));
            dispatch(uiActions.setLoading(true));
            const accounts = await api.keyring.loadAccounts();
            dispatch(keyringActions.loadAccountsSuccess(accounts));
            dispatch(uiActions.setLoading(false));
        } catch (error) {
            log("ERROR: ", error);
            dispatch(keyringActions.loadAccountsFailure(error));
        }
    }
}

const addAccountFlow = ({api, log}) => ({dispatch}) => next => async (action) => {
    next(action);

    if (action.type === keyringActions.ADD_ACCOUNT) {
        try {
            dispatch(uiActions.setLoadingMessage("Adding New Account"));
            dispatch(uiActions.setLoading(true));
            const account = await api.keyring.addAccount(action.payload);
            dispatch(keyringActions.addAccountSuccess(account));
            dispatch(keyringActions.setActiveAccount(account));
            dispatch(uiActions.setLoading(false));
        } catch (error) {
            log("ERROR: ", error);
            //dispatch(keyringActions.loadAccountsFailure(error));
        }
    }
}

const setActiveAccountFlow = ({api, log}) => ({dispatch}) => next => async (action) => {
    next(action);

    if (action.type === keyringActions.SET_ACTIVE_ACCOUNT) {
        try {
            const account = await api.keyring.setActiveAccount(action.payload.account, action.payload.passphrase);
            dispatch(keyringActions.activeAccountSet(account));
        } catch (error) {
            log("ERROR: ", error);
            //dispatch(keyringActions.loadAccountsFailure(error));
        }
    }
}

const getAccountInfoFlow = ({log}) => ({getState, dispatch}) => next => async (action) => {
    next(action);

    if (action.type === keyringActions.GET_ACCOUNT_INFO) {
        try {
            const account = getState().keyring.activeAccount;

            if(account && account.accountInfo) {
                dispatch(keyringActions.getAccountInfoSuccess(account.accountInfo));
            } else {
                dispatch(providerActions.callSystemExtrinsic(action.payload));
            }
        } catch (error) {
            log("getAccountInfoFlow => ERROR: ",  error);
            //dispatch(keyringActions.loadAccountsFailure(error));
        }
    }
}

const generatePhraseFlow = ({api, log}) => ({getState, dispatch}) => next => async (action) => {
    next(action);

    if (action.type === keyringActions.GENERATE_PHRASE) {
        try {
            const phrase = api.keyring.generatePhrase();
            log(phrase);
            dispatch(keyringActions.generatePhraseSuccess(phrase));
        } catch (error) {
            log("generatePhraseFlow => ERROR: ",  error);
            //dispatch(keyringActions.loadAccountsFailure(error));
        }
    }
}

const subscribeToBalanceFlow = ({api, log}) => ({getState, dispatch}) => next => async (action) => {
    next(action);

    if (action.type === keyringActions.SUBSCRIBE_TO_BALANCE) {
        try {
            const account = getState().keyring.activeAccount;
            const connection = getState().provider.connection;
            api.provider.subscribeToBalanceUpdates(dispatch, connection, account);
            log("Getting balance updates");
        } catch (error) {
            log("subscribeToBalanceFlow => ERROR: ",  error);
        }
    }
}

export default [
    initKeyringFlow,
    loadAccountsFlow,
    addAccountFlow,
    setActiveAccountFlow,
    getAccountInfoFlow,
    generatePhraseFlow,
    subscribeToBalanceFlow,
]