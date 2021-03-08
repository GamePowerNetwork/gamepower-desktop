export const CONNECT             = '[socket] connect';
export const CONNECT_SUCCESS     = '[socket] connect success';
export const CONNECT_FAILURE     = '[socket] connect failure';
export const DISCONNECT          = '[socket] disconnect';

export const SEND_MESSAGE        = 'game://message';
export const SEND_EXTRINSIC      = 'game://message/extrinsic';
export const SEND_STORAGE        = 'game://message/storage';
export const RECEIVE_MESSAGE     = '[socket] receive message';

export const OPEN_WINDOW         = 'app://open';


export const connect = uri => ({
    type: CONNECT,
    payload: uri,
});

export const connectSuccess = socket => ({
    type: CONNECT_SUCCESS,
    payload: socket,
});

export const connectFailure = error => ({
    type: CONNECT_FAILURE,
    payload: error,
});

export const disconnect = () => ({
    type: DISCONNECT,
});

export const sendMessgae = (data) => ({
    type: SEND_MESSAGE,
    meta: {remote: true},
    payload: {
        data,
    }
});

export const sendExtrinsic = (data) => ({
    type: SEND_EXTRINSIC,
    meta: {remote: true},
    payload: {
        data,
    }
});


export const sendStorage = (data) => ({
    type: SEND_STORAGE,
    meta: {remote: true},
    payload: {
        data,
    }
});


export const receiveMessgae = (data) => ({
    type: RECEIVE_MESSAGE,
    payload: {
        data,
        timestamp: Date.now(),
    }
});

export const openWindow = {
    type: OPEN_WINDOW,
    meta: {remote: true}
};