export const CONNECT_PROVIDER               = '[provider] connect';
export const CONNECT_PROVIDER_SUCCESS       = '[provider] connect success';
export const CONNECT_PROVIDER_FAILURE       = '[provider] connect failure';

export const CALL_GAMEPOWER_EXTRINSIC       = 'provider://gamepower';
export const CALL_NFT_EXTRINSIC             = 'provider://nft';
export const CALL_SYSTEM_EXTRINSIC          = 'provider://system';
export const CALL_GAMEPOWER_STORAGE         = 'provider://gamepower/storage';

export const connectToProvider = {
    type: CONNECT_PROVIDER,
};

export const connectProviderSuccess = provider => ({
    type: CONNECT_PROVIDER_SUCCESS,
    payload: provider,
});

export const connectProviderFailure = error => ({
    type: CONNECT_PROVIDER_FAILURE,
    payload: error,
});

export const callGamerpowerExtrinsic = data => ({
    type: CALL_GAMEPOWER_EXTRINSIC,
    payload: data,
});

export const callNFTExtrinsic = data => ({
    type: CALL_NFT_EXTRINSIC,
    payload: data,
});

export const callSystemExtrinsic = data => ({
    type: CALL_SYSTEM_EXTRINSIC,
    payload: data,
});

export const callGamepowerStorage = data => ({
    type: CALL_GAMEPOWER_STORAGE,
    payload: data,
})