/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * Luigi POOLE wrote this. You can do whatever you want with this stuff.
 * If we meet some day, and you think this stuff is worth it,
 * you can buy me a beer in return.
 * ----------------------------------------------------------------------------
 */
 
import cluster from 'cluster';

if (cluster.isMaster) {
	cluster.fork();

	cluster.on("exit", (worker, code) => {
		if (code != 0) {
			console.error('Worker crashed or was rebooted! Spawning a replacement.');
			cluster.fork();
		}
	});
} else {
	module.exports = require('./thoughtLeader.js');
}