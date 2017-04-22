import bunyan = require('bunyan');

export const LOGGER = bunyan.createLogger({
    name: 'state-machine-app-logger',
    stream: process.stdout,
    level: 'debug'
});
