import { IAccount } from "./IAccount";

export interface IKeyRingState {
    initialized: Boolean;
    activeAccount?: IAccount;
    allAccounts: IAccount[];
    accountsLoaded: Boolean;
    accountBalance: any;
    phrase?: string | undefined;
    error?: Error;
}