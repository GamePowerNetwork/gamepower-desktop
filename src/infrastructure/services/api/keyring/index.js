import keyring from '@polkadot/ui-keyring';
import { BrowserStore } from '@polkadot/ui-keyring/stores';
import { Keyring } from '@polkadot/api';
import { mnemonicGenerate, cryptoWaitReady } from '@polkadot/util-crypto';
import { stringToU8a, u8aToHex } from '@polkadot/util';


export default {
    addAccount: async (accountData) => {
        // add the account, encrypt the stored JSON with an account-specific password
        const { pair, json } = keyring.addUri(accountData.phrase, accountData.password, { name: accountData.username });

        return pair
    },

    generatePhrase: () => {
        // generate a random mnemonic, 12 words in length
        const mnemonic = mnemonicGenerate(12);

        return mnemonic;
    },

    loadAccounts: async () => {

        const accounts = keyring.getAccounts();
        return accounts

    },

    initialize: async () => {
        let ready = await cryptoWaitReady();

        if(ready) {
            keyring.loadAll({ ss58Format: 42, type: 'sr25519', store: new BrowserStore() });
        }

        return true;
    },

    setActiveAccount: async (account, passphrase) => {
        const pair = keyring.getPair(account.address);
        pair.unlock(passphrase);
        
        return pair;
    }
}