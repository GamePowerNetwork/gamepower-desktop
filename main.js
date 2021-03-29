// Modules to control application life and create native browser window
const {app, BrowserWindow, Tray, ipcMain} = require('electron')
const { default: installExtension, REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')
const path = require('path')
const fs = require('fs')
const WebSocket = require('ws')
const socketActions = require('./app_modules/socketActions');
var express = require('express')
var exp = express()
var server = require('http').createServer(exp)
const {api, MessageTypes, IMessage} = require('@gamepower/api')

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

const PORT = 30066;
const wss = new WebSocket.Server({port: PORT}, () => {
  console.log('server started')
})

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    let rawData = data.toString();
    console.log(rawData);
    api.parseData(rawData);
  })

  ws.send(JSON.stringify({
    Type: MessageTypes.TitleDataResult,
    Data: {
      Name: "Coin Hunter",
      Token: "jaefssieef4345ksadfifll32s"
    }
  }))

  // Connect to provider
  api.connect("wss://gamepower.io");

  api.on("appRequest", (data) => {
    createConfirmationWindow();
  })

  api.on("grantCollectable", (data) => {
    mainWindow.webContents.send("grantCollectable", data);
  })

  api.on("userData", (data) => {
    console.log(data);
    ws.send(JSON.stringify({
      Type: MessageTypes.ApiResult,
      Data: {
        Key: data.Key,
        Value: data.Data
      }
    }))
  })

  ipcMain.on('request:declined', (event, arg) => {
    ws.send(JSON.stringify({
      Type: MessageTypes.AppResult,
      Data: {
        Accepted: false
      }
    }))
  })
  
  ipcMain.on('request:accepted', (event, arg) => {
    ws.send(JSON.stringify({
      Type: MessageTypes.AppResult,
      Data: {
        Accepted: true
      }
    }))
  })

  ipcMain.on('collectable:declined', (event, arg) => {
    ws.send(JSON.stringify({
      Type: "CollectionResult",
      Data: {
        Accepted: false
      }
    }))
  })
  
  ipcMain.on('collectable:accepted', (event, arg) => {

    let data = {
      Data: {
        Key: "hasSword",
        Value: true,
        Endpoint: "user/setData"
      },
      Type: "ApiRequest"
    }

    const rawData = JSON.stringify(data);
    console.log(rawData);
    api.parseData(rawData);

    ws.send(JSON.stringify({
      Type: "CollectionResult",
      Data: {
        Accepted: true
      }
    }))
  })
})

wss.on('listening', () => {
  console.log('server is listening on port: ' + PORT);
})


exp.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
    return res.send(200);
  } else {
    return next();
  }
});

exp.use(express.static(path.join(__dirname, 'public')));

// Main Window
let mainWindow;
let tray = null

// Game Window
let gameWindow;

// Confirmation Window
let confirmationWindow;

// Grant Collectable Window
let grantCollectableWindow;

function createMainWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1254,
    height: 880,
    minWidth:1254,
    minHeight: 880,
    frame:false,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule:true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL('http://127.0.0.1:3006')
  //mainWindow.loadURL('./build/index.html')
  //mainWindow.loadFile('./build/index.html')

  // remove the menu
  mainWindow.removeMenu()

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  //Tray
  const iconPath = path.join(__dirname, "./public/favicon.ico");
  tray = new Tray(iconPath);
}

function createGameWindow () {
  // Create the browser window.
  gameWindow = new BrowserWindow({
    width: 1260,
    height: 810,
    frame:false,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule:true
    }
  })

  // and load the index.html of the app.
  gameWindow.loadURL('http://127.0.0.1:3006/#/gameview')

  // remove the menu
  gameWindow.removeMenu()
  gameWindow.webContents.openDevTools()
}

function createConfirmationWindow () {
  // Create the browser window.
  confirmationWindow = new BrowserWindow({
    width: 300,
    height: 500,
    frame:false,
    titleBarStyle: "hidden",
    movable: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule:true
    }
  })

  // and load the index.html of the app.
  confirmationWindow.loadURL('http://127.0.0.1:3006/#/confirmation')

  // remove the menu
  confirmationWindow.removeMenu()
}

function createGrantCollectableWindow () {
  // Create the browser window.
  grantCollectableWindow = new BrowserWindow({
    width: 470,
    height: 600,
    frame:false,
    titleBarStyle: "hidden",
    movable: false,
    alwaysOnTop: true,
    transparent: true,
    type:'toolbar',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule:true
    }
  })

  // and load the index.html of the app.
  grantCollectableWindow.loadURL('http://127.0.0.1:3006/#/grant-collectable')

  // remove the menu
  grantCollectableWindow.removeMenu()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));

  createMainWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
/**
 * Socket.io
 */
io.on("connection", function(socket) {

  socket.on('extrinsics', (data) => {
    const parsedData = JSON.parse(data);
    socket.broadcast.emit('action', socketActions.receiveMessgae(parsedData));
  });

  socket.on('storage', (data) => {
    const parsedData = JSON.parse(data);
    socket.broadcast.emit('action', socketActions.receiveMessgae(parsedData));
  });

  socket.on('action', (message) => {
    if(message.type == socketActions.SEND_MESSAGE) {
      socket.broadcast.emit(socketActions.SEND_MESSAGE, message.payload.data);
    }

    if(message.type == socketActions.SEND_EXTRINSIC) {
      socket.broadcast.emit(socketActions.SEND_EXTRINSIC, message.payload.data);
    }

    if(message.type == socketActions.SEND_STORAGE) {
      socket.broadcast.emit(socketActions.SEND_STORAGE, message.payload.data);
    }

    if(message.type == socketActions.OPEN_WINDOW) {
      createGameWindow();
    }
  });

});

server.listen(3182, function () {
  console.log('[server] listening at port %d', 3182);
});
