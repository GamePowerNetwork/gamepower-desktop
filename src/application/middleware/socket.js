import * as socketActions from "../actions/socket";
import * as providerActions from "../actions/provider";

const connectFlow = ({api, log}) => ({dispatch}) => next => async (action) => {
    next(action);

    if (action.type === socketActions.CONNECT) {
        try {
            log("CONNECTING TO SOCKET: ", action.payload);
            let socket = await api.socket.connect();

            socket.on("extrinsics", data => {
                log("SOCKET MESSAGE RECEIVED: ", data);
                dispatch(socketActions.receiveMessgae(data));
            });


            dispatch(socketActions.connectSuccess(socket));


        } catch (error) {
            log("ERROR: ", error);
            dispatch(socketActions.connectFailure(error));
        }
    }
}

const disconnectFlow = ({api, log}) => ({dispatch}) => next => async (action) => {
    next(action);

    if (action.type === socketActions.DISCONNECT) {
        try {
            
        } catch (error) {
            log("ERROR: ", error);
        }
    }
}

const sendMessageFlow = ({api, log}) => ({dispatch}) => next => async (action) => {
    next(action);

    if (action.type === socketActions.SEND_MESSAGE) {
        try {

        } catch (error) {
            log("ERROR: ", error);
        }
    }
}

const receiveMessageFlow = ({api, log}) => ({dispatch}) => next => async (action) => {
    next(action);

    if (action.type === socketActions.RECEIVE_MESSAGE) {
        try {
            const data = action.payload.data;

            if(data.type === providerActions.CALL_GAMEPOWER_EXTRINSIC) {
                dispatch(providerActions.callGamerpowerExtrinsic(data));
            }
        } catch (error) {
            log("ERROR: ", error);
        }
    }
}

export default [
    connectFlow,
    disconnectFlow,
    sendMessageFlow,
    receiveMessageFlow,
]