const util = require('util');
const childProcess = require('child_process');
const execFile = util.promisify(childProcess.execFile);

/**
 * @typedef config
 * @property {number} [timeout=5000] Request timeout.
 * @property {number} [attempts=3] Number of request attempts.
 * @property {string} [encoding="utf8"] Response encoding.
 * @property {boolean} [log=false] Log details of the request.
 */

/**
 * Anonymous-Request
 * @author Kirlovon
 * @description Sends anonymous HTTP request via Tor
 *
 * @async
 * @param {string} url URL to send GET request.
 * @param {config} [config={}] Request config.
 * @returns {Promise<string>} Response body.
 */
async function AnonymousRequest(url, config = {}) {

	// Validate data
	if (process.platform !== 'win32') throw new Error('Your operating system is not supported');
	if (typeof url !== 'string') throw new Error('URL must be a string');
	if (typeof config !== 'object') throw new Error('Config must be an object');
	if (typeof config.timeout !== 'number') config.timeout = 5000;
	if (typeof config.attempts !== 'number') config.attempts = 3;
	if (typeof config.encoding !== 'string') config.encoding = 'utf8';
	if (typeof config.log !== 'boolean') config.log = false;

	let output;

	// Try to send request
	for (let attempt = 0; attempt < config.attempts; attempt++) {
		try {

			output = await execFile('mini-tor.exe', [url], {
				timeout: config.timeout,
				encoding: config.encoding,
				windowsHide: true,
			});

			if (typeof output === 'object') break;

		} catch (error) {
			if (config.log) console.error('\x1b[33m%s\x1b[0m', `Attempt number ${attempt + 1} failed!`);
		}
	}

	// Remove spaces from error and response
	const error = output.stderr.trim();
	const response = output.stdout.trim();

	if (error !== '') throw new Error(error);
	return response;
}

module.exports = AnonymousRequest;
