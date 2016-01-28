import Promise from 'bluebird';
import handelErrors from './logger';

process.on('uncaughtException', error => console.error(error));
process.on('unhandledRejection', error => console.error(error));
process.on('rejectionHandled', error => console.error(error));
