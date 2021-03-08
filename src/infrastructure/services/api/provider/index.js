import { ApiPromise, WsProvider } from '@polkadot/api';
import { sendExtrinsic, sendMessgae, sendStorage } from '../../../../application/actions/socket';
import * as keyringActions from '../../../../application/actions/keyring';

import { formatBalance } from '@polkadot/util';

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

    queryGamepower: async (dispatch, connection, account) => {
        console.log(account);
        const returnValue = await connection.query.gamepower.playerLights(account.address);


        let result = {
            section: 'storage',
            method: 'playerLights',
            data: returnValue
        }
        console.log(JSON.stringify(result));
        dispatch(sendStorage(JSON.stringify(result)));
    },

    subscribeToBalanceUpdates: async (dispatch, connection, account) => {
        await connection.query.system.account(account.address, ({ nonce, data: balance }) => {
            const formattedBalance = formatBalance(balance.free, { forceUnit: '-' }, 12);
            dispatch(keyringActions.accountBalanceUpdated({formattedBalance, nonce}))
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

                dispatch(sendExtrinsic(JSON.stringify(result)));

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