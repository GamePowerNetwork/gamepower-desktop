const RECEIVE_MESSAGE     = '[socket] receive message';
const SEND_MESSAGE        = 'game://message';
const SEND_EXTRINSIC      = 'game://message/extrinsic';
const SEND_STORAGE        = 'game://message/storage';
const OPEN_WINDOW         = 'app://open'

let receiveMessgae = (data) => ({
    type: RECEIVE_MESSAGE,
    payload: {
        data,
    }
});

module.exports.RECEIVE_MESSAGE = RECEIVE_MESSAGE;
module.exports.SEND_MESSAGE = SEND_MESSAGE;
module.exports.SEND_EXTRINSIC = SEND_EXTRINSIC;
module.exports.SEND_STORAGE = SEND_STORAGE;
module.exports.OPEN_WINDOW = OPEN_WINDOW;
module.exports.receiveMessgae = receiveMessgae;