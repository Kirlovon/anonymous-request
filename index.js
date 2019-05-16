const { spawn } = require('child_process');

/**
 * Anonymous-Request
 * @author Kirlovon
 * @description Sends anonymous HTTP request via Tor
 */
function AnonymousRequest(url, options = {}, callback) {
	if (process.platform !== 'win32') throw new Error('Your operating system is not supported');
}

module.export = AnonymousRequest;
