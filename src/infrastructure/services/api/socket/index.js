import socketIOClient from "socket.io-client";


export default {
    connect: async (uri) => {
        const socket = socketIOClient(uri);

        return socket;
    },

    disconnect: async (socket) => {
        socket.disconnect();
    }
}