const WebSocket = require('ws')

const socket = {
    start: (port) => {
        const wss = new WebSocket.Server({port}, () => {
            console.log('server started')
        })

        wss.on('connection', (ws) => {
            ws.on('message', (data) => {
                console.log('data received %o' + data)
                ws.send(data)
            })
        })

        wss.on('listening', () => {
            console.log('server is listening on port: ' + port);
        })
    }
}


module.exports.socketServer = socket;