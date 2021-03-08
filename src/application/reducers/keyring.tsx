import { IKeyRingState } from '../../infrastructure/interfaces/IKeyRingState';
import * as keyringActions from '../actions/keyring';

const initialState: IKeyRingState = {
    initialized: false,
    activeAccount: undefined,
    allAccounts: [],
    accountsLoaded: false,
    accountBalance: null,
    phrase: undefined,
    error: undefined
};

const reducer = (state = initialState, action: any): IKeyRingState => {
    switch (action.type) {
        case keyringActions.INIT_KEYRING_SUCCESS:
            return { ...state, initialized: true };
        case keyringActions.INIT_KEYRING_FAILURE:
            return { ...state, initialized: false };
        case keyringActions.LOAD_ACCOUNTS_SUCCESS:
            return { ...state, allAccounts: action.payload, accountsLoaded: true, error: undefined };
        case keyringActions.LOAD_ACCOUNTS_FAILURE:
            return { ...state, accountsLoaded: false, error: action.payload };
        case keyringActions.ADD_ACCOUNT_SUCCESS:
            return { ...state, phrase: undefined, allAccounts: [
                ...state.allAccounts,
                action.payload,
            ]};
        case keyringActions.ACTIVE_ACCOUNT_SET:
            return { ...state, activeAccount: action.payload };

        
        case keyringActions.GET_ACCOUNT_INFO_SUCCESS:
            return { ...state, activeAccount: {
                ...state.activeAccount,
                accountInfo: action.payload,
            }};
        case keyringActions.GET_ACCOUNT_INFO_FAILURE:
            return { ...state, activeAccount: {
                ...state.activeAccount,
                accountInfo: undefined,
            }}
        case keyringActions.GENERATE_PHRASE_SUCCESS:
            return { ...state, phrase: action.payload };

        case keyringActions.ACCOUNT_BALANCE_UPDATED:
            return { ...state, accountBalance: action.payload };
        default:
            return state;
    }
}

export default reducer;