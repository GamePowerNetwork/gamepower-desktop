let RECEIVE_MESSAGE     = '[socket] receive message';
let SEND_MESSAGE        = 'game://message';
let OPEN_WINDOW         = 'app://open'

let receiveMessgae = (data) => ({
    type: RECEIVE_MESSAGE,
    payload: {
        data,
    }
});

module.exports.RECEIVE_MESSAGE = RECEIVE_MESSAGE;
module.exports.SEND_MESSAGE = SEND_MESSAGE;
module.exports.OPEN_WINDOW = OPEN_WINDOW;
module.exports.receiveMessgae = receiveMessgae;