const path = require("path");
const util = require('util');
const childProcess = require('child_process');
const execFile = util.promisify(childProcess.execFile);

/**
 * @typedef Config Request config.
 * @property {number} [timeout=10000] Request timeout.
 * @property {number} [attempts=5] Number of request attempts.
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
 * @param {Config} [config={}] Request config.
 * @returns {Promise<string>} Response body.
 */
async function AnonymousRequest(url, config = {}) {

	// Validate data
	if (process.platform !== 'win32') throw new Error('Your operating system is not supported');
	if (typeof url !== 'string') throw new Error('URL must be a string');
	if (typeof config !== 'object') throw new Error('Config must be an object');
	if (typeof config.timeout !== 'number') config.timeout = 10000;
	if (typeof config.attempts !== 'number') config.attempts = 5;
	if (typeof config.encoding !== 'string') config.encoding = 'utf8';
	if (typeof config.log !== 'boolean') config.log = false;

	// Get path to the "mini-tor.exe"
	const miniTor = path.join(__dirname, '/mini-tor.exe');

	let output;

	// Try to send request
	for (let attempt = 0; attempt < config.attempts; attempt++) {
		try {

			output = await execFile(miniTor, [url], {
				timeout: config.timeout,
				encoding: config.encoding,
				windowsHide: true,
			});

			if (typeof output === 'object') {
				if (config.log) {
					const date = new Date();
					const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();
					console.warn(`[${time}] Attempt request to "${url}" number ${attempt + 1}/${config.attempts} succeed!`);
				}
				break;
			}

		} catch (error) {
			if (output.stdin && typeof output.stdin.end === 'function') output.stdin.end();
			if (config.log) {
				const date = new Date();
				const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();
				console.warn(`[${time}] Attempt request to "${url}" number ${attempt + 1}/${config.attempts} failed!`);
			}
		}
	}

	if (typeof output !== 'object') throw new Error('Couldn\'t get a response from the server');

	// Remove spaces from error and response
	const error = output.stderr.trim();
	const response = output.stdout.trim();

	if (error !== '') throw new Error(error);
	return response;
}

module.exports = AnonymousRequest;
