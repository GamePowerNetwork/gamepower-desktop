import ui from './ui';
import provider from './provider';
import keyring from './keyring';
import socket from './socket';

export default [
    ...ui,
    ...provider,
    ...keyring,
    ...socket,
]