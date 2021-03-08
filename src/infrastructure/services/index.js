import api from './api';
import consoleLogger from './logger/console';

const services = {
    log: consoleLogger,
    api,
}

export default services;