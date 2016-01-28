import Promise from 'bluebird';
import Logger from './logger';
import twitterHandler from './twitterHandler';
import config from '../config.json';



console.log('Starting')
const twitterHandle = new twitterHandler(config);


twitterHandle.on('newTweet', tweet => console.log(tweet));


(function wait() {
	setTimeout(wait, 1000);
})();