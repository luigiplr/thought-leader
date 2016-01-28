import Promise from 'bluebird';
import Logger from './logger';
import twitterHandler from './twitterHandler';
import config from '../config.json';


const twitterHandle = new twitterHandler(config);

twitterHandle.emitter.on('newTweet', tweet => console.log(tweet));
