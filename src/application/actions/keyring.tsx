import { IAccount } from "../../infrastructure/interfaces/IAccount";

export const INIT_KEYRING               = '[keyring] initialize'
export const INIT_KEYRING_SUCCESS       = '[keyring] initialize success';
export const INIT_KEYRING_FAILURE       = '[keyring] initialize failure';

export const LOAD_ACCOUNTS              = '[keyring] load accounts';
export const LOAD_ACCOUNTS_SUCCESS      = '[keyring] load accounts success';
export const LOAD_ACCOUNTS_FAILURE      = '[keyring] load accounts failure';

export const SET_ACTIVE_ACCOUNT         = '[keyring] set active account';
export const ACTIVE_ACCOUNT_SET         = '[keyring] active account set';

export const ADD_ACCOUNT                = '[keyring] add account';
export const ADD_ACCOUNT_SUCCESS        = '[keyring] add account success';

export const GET_ACCOUNT_INFO           = '[keyring] get account info';
export const GET_ACCOUNT_INFO_SUCCESS   = '[keyring] get account info success';
export const GET_ACCOUNT_INFO_FAILURE   = '[keyring] get account info failure';

export const GENERATE_PHRASE            = '[keyring] generate phrase';
export const GENERATE_PHRASE_SUCCESS    = '[keyring] generate phrase success';

export const SUBSCRIBE_TO_BALANCE       = '[keyring] subscribe to account balance updates';
export const ACCOUNT_BALANCE_UPDATED    = '[keyring] account balance updated';


export const initKeyring = {
    type: INIT_KEYRING,
};

export const initKeyringSuccess = () => ({
    type: INIT_KEYRING_SUCCESS,
});

export const initKeyringFailure = (error: Error) => ({
    type: INIT_KEYRING_FAILURE,
    payload: error,
});

export const loadAccounts = {
    type: LOAD_ACCOUNTS,
};

export const loadAccountsSuccess = (accounts: IAccount[]) => ({
    type: LOAD_ACCOUNTS_SUCCESS,
    payload: accounts,
});

export const loadAccountsFailure = (error: Error) => ({
    type: LOAD_ACCOUNTS_FAILURE,
    payload: error,
});

export const setActiveAccount = (account:IAccount, passphrase: string) => ({
    type: SET_ACTIVE_ACCOUNT,
    payload: {
        account,
        passphrase,
    }
});

export const activeAccountSet = (account:IAccount) => ({
    type: ACTIVE_ACCOUNT_SET,
    payload: account,
});

export const addAccount = (phrase:any, password:string, username:string) => ({
    type: ADD_ACCOUNT,
    payload: {
        phrase,
        password,
        username,
    },
});

export const addAccountSuccess = (account: IAccount) => ({
    type: ADD_ACCOUNT_SUCCESS,
    payload: account,
});

export const getAccountInfo = (account: IAccount) => ({
    type: GET_ACCOUNT_INFO,
    payload: account,
});

export const getAccountInfoSuccess = (accountInfo: any) => ({
    type: GET_ACCOUNT_INFO_SUCCESS,
    payload: accountInfo,
});

export const getAccountFailure = (error: Error) => ({
    type: GET_ACCOUNT_INFO_FAILURE,
    payload: error,
});

export const generatePhrase =  {
    type: GENERATE_PHRASE,
};

export const generatePhraseSuccess = (phrase:string) => ({
    type: GENERATE_PHRASE_SUCCESS,
    payload: phrase,
});

export const subscribeToBalance = {
    type: SUBSCRIBE_TO_BALANCE,
};

export const accountBalanceUpdated = (data: any) => ({
    type: ACCOUNT_BALANCE_UPDATED,
    payload: data,
});