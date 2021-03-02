import { combineReducers } from 'redux';
import ui from './ui';
import provider from './provider';
import keyring from './keyring';
import socket from './socket';

export default combineReducers({
    ui,
    provider,
    keyring,
    socket,
})