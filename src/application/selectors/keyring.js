export const getAccounts = state => state.keyring.allAccounts;
export const getActiveAccount = state => state.keyring.activeAccount;
export const getKeyringInitialized = state => state.keyring.initialized;
export const getPhrase = state => state.keyring.phrase;
export const getAccountBalance = state => state.keyring.accountBalance;