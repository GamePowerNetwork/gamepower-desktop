import { compose, applyMiddleware, createStore } from "redux";
import reducers from './reducers';
import middleware from './middleware';
import socketIoMiddleware from 'redux-socket.io-middleware';
import socketIO from 'socket.io-client';

const ENDPOINT = "http://127.0.0.1:3182";
const io = socketIO.connect(ENDPOINT);

// dev tool
const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;


export const configureStore = (services) => createStore(
    reducers, 
    composeEnhancers(applyMiddleware(...middleware.map(f => f(services)), socketIoMiddleware(io)))
);