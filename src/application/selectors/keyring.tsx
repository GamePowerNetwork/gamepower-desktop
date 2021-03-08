import { IAccount } from "../../infrastructure/interfaces/IAccount"
import { IState } from "../../infrastructure/interfaces/IState";

export const getAccounts = (state: IState) => state.keyring.allAccounts;
export const getActiveAccount = (state: IState) => state.keyring.activeAccount;
export const getKeyringInitialized = (state: IState) => state.keyring.initialized;
export const getPhrase = (state: IState) => state.keyring.phrase;
export const getAccountBalance = (state: IState) => state.keyring.accountBalance;