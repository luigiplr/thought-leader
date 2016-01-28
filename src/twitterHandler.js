import Twitter from 'twitter';
import _ from 'lodash';
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
		interval = 1000,
	}) {
		super(arguments[0]);

		this.emitter = new EventEmitter();
		this.mostRecentTweet = {};

		this.watcher = setInterval(() => this.pollTwitter(account), interval);
		this.pollTwitter(account);
	}

	pollTwitter(account) {
		this.get('statuses/user_timeline', {
			screen_name: account,
			trim_user: true,
			exclude_replies: true
		}, (error, tweets) => {
			if (error) return console.error(error) && clearInterval(this.watcher);
			if (!tweets || !tweets[0]) return console.log('No Tweets!');

			const tweet = tweets[0];

			if (tweet.retweeted || tweet.is_quote_status || tweet.in_reply_to_status_id || tweet.in_reply_to_user_id || tweet.in_reply_to_screen_name) return;
			if (_.isEqual(this.mostRecentTweet, tweet)) return;

			this.mostRecentTweet = tweet;
			this.emitter.emit('newTweet', tweet)
		});
	}
};


export
default TwitterHandler;