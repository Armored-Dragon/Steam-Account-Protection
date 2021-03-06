/* ----------------------------- Basic Selectors ---------------------------- */
const qs = (tag) => document.querySelector(tag);
const qsa = (tag) => document.querySelectorAll(tag);

/* ---------------------------------- Time ---------------------------------- */
const time = {
	current_time: () => Date.now(),																													// Returns the current time
	utc_to_string: (utc_time) => new Date(new Date(utc_time).getTime()).toLocaleString(),		// Converts utc time into a readable string.
	hours_to_milliseconds: (hours) => hours * 60 * 60 * 1000,
	check_age: (age, hours) => age + time.hours_to_milliseconds(hours) > time.current_time(), 		// If the "age" + "hours" is greater than the current time (Age is young), return true
	update_schedule: (cached_time, timeout) => `\nCurrent time: ${time.utc_to_string(time.current_time())}\nNext Update: ${time.utc_to_string(cached_time + timeout)}`
};

/* ---------------------------- URL and Requests ---------------------------- */
function url_params(url) {
	let vars = {};
	url.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => vars[key] = value);
	return vars;
}
function webrequest(type, url) {
	return new Promise((resolve, reject) => {
		let newXHR = new XMLHttpRequest() || new window.ActiveXObject('Microsoft.XMLHTTP');
		newXHR.open(type, url, true);
		newXHR.send();
		newXHR.onreadystatechange = function () {
			if (this.readyState === 4) {
				if (this.status === 200) return resolve(this.response);
				else return reject({ error: this.status });
			}
		};
	});
}

/* ------------------------------- Comparison ------------------------------- */
const compare = {
	// Compares two strings and returns a decimal between 0 and 1 based on how similar they are
	string: (current, base) => {
		let percent = 0;
		let x = 0;
		while (current.length > x++) {
			if (current.charAt(x) === base.charAt(x)) percent++;
		}
		return Math.round(percent / current.length * 100);
	}
};

/* ---------------------------------- Misc ---------------------------------- */
//Custom console.log formatting
function log(data) {
	if (typeof data === 'string')
		return console.log(`%c[SAP] [${new Date().toLocaleString()}] ${data}`, 'color: #ffffff');

	console.log(`%c[SAP] [${new Date().toLocaleString()}] ↓`, 'color: #ffffff');
	console.log(data);
}

function array_to_string(arr) {
	let response = ``;
	if (arr.length === 0) return;

	arr.forEach((item, index) => {
		response += item;
		if (index !== (arr.length - 1))
			response += `, `;
	});
	return response;
}
