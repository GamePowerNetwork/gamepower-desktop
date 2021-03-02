import { ApiPromise, WsProvider } from '@polkadot/api';
import { sendMessgae } from '../../../../application/actions/socket';
import * as keyringActions from '../../../../application/actions/keyring';

export default {
    connect: async (uri) => {
        const wsProvider = new WsProvider(uri);
        const connection = await ApiPromise.create({ 
        provider: wsProvider,
        
        types: {
            "CID": "Vec<u8>",
            "GuildId": "u64",
            "GuildOf": "Guild<AccountIdOf>",
            "AccountIdOf": "AccountId",
            "BalanceOf": "Balance",
            "ClassId": "u64",
            "ClassIdOf": "ClassId",
            "ClassInfoOf": "ClassInfo",
            "ClassInfo": {
            "metadata": "Vec<u8>",
            "total_issuance": "TokenId",
            "owner": "AccountId",
            "data": "ClassData"
            },
            "ClassData": {
            "deposit": "Balance",
            "properties": "ClassProperties"
            },
            "TokenId": "u64",
            "Amount": "i128",
            "AmountOf": "Amount",
            "CurrencyIdOf": "CurrencyId",
            "CurrencyId": {
            "_enum": [
                "Native",
                "DOT",
                "KSM",
                "AP"
            ]
            },
            "Guild": {
            "id": "GuildId",
            "name": "Text",
            "members": "Vec<AccountId>"
            },
            "GuildUpdate": {
            "members": "Vec<AccountId>",
            "name": "Text"
            },
            "ClassProperties": {
            "Transferrable": "bool",
            "Burnable": "bool"
            }
        }
        });

        return connection;
    },

    subscribeToBalanceUpdates: async (dispatch, connection, account) => {
        const unsub = await connection.query.system.account(account.address, ({ nonce, data: balance }) => {
            console.log(`free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`);
            dispatch(keyringActions.accountBalanceUpdated({balance, nonce}))
        });
    },

    gamepower: async (dispatch, connection, account, data) => {
        const callExtrinsic = connection.tx.gamepower[data.method]();
        const unsub = await callExtrinsic.signAndSend(account, ({ events = [], status }) => {
            if (status.isInBlock) {
                console.log(`Completed at block hash #${status.asInBlock.toString()}`);

                let result = {
                    section: events[0].event.section,
                    method: events[0].event.method,
                    data: events[0].event.data
                }

                dispatch(sendMessgae(JSON.stringify(result)));

                unsub();
            } else {
                console.log(`Current status: ${status.type}`);
            }
        }).catch((error) => {
            console.log(':( transaction failed', error);
        });
    },

    system: async (dispatch, connection, account) => {
        const accountInfo = await connection.query.system.account(account.address);

        dispatch(keyringActions.getAccountInfoSuccess(accountInfo));
    }
}