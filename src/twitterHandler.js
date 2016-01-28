import Twitter from 'twitter';
import {
	EventEmitter
}
from 'events';



class TwitterHandler extends Twitter {
	constructor({
		consumer_key,
		consumer_secret,
		access_token_key,
		access_token_secret,
		account,
		interval = 300,
	}) {
		super(arguments);

		console.log(this)

		this.emitter = new EventEmitter();
		this.mostRecentTweet = {};

		this.pollTwitter(account)

		return this.emitter;
	}

	pollTwitter(account) {
		this.stream('statuses/user_timeline', {
			screen_name: account,
			trim_user: true,
			exclude_replies: true
		}, stream => {
			stream.on('data', tweet => {
				console.log(tweet.text);
			});

			stream.on('error', error => {
				throw error;
			});
		});
	}
};


export
default TwitterHandler;