export interface IAccount {
    address?: string;
    meta?: IAccountMeta;
    publicKey?: Uint8Array;
    addressRaw?: Uint8Array;
    isLocked?: Boolean;
    type?: string;
    accountInfo?: any;
}

export interface IAccountMeta {
    name: string;
    whenCreated: number;
}