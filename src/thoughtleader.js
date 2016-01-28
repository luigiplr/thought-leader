import Promise from 'bluebird';
import Logger from './logger';
import twitterHandler from './twitterHandler';
import config from '../config';



const twitterHandle = new twitterHandler(...config);