var mime = (function() {
	var config = {
		debug: false
	};
	
	/* Helper functions */
	function trim(str) {
		return str.replace(/^\s+|\s+$/gm, '');
	}
	function parseHeader(str) {
		var header = [], lines = str.split('\n');
		for(var i = 0; i < lines.length; i++) {
			if(lines[i] == '') continue;
			var line = lines[i].split(':');
			header[trim(line[0])] = trim(line[1]);
		}
		return header;
	}
	function mimeFromRequest(req) {
		var header = parseHeader(req.getAllResponseHeaders());
		if('content-type' in header) {
			if(header['content-type'] != '') {
				return header['content-type'];
			} else {
				debug('Content-Type empty');
			}
		} else {
			debug('Content-Type not in header');
		}
		return null;
	}
	
	/* Request */
	function requestAsync(method, url) {
		return new Promise(function(resolve, reject) {
			var req = new XMLHttpRequest();
			req.onreadystatechange = function() {
				if (this.readyState == 4 && this.status != 0) {
					resolve(this);
				}
			}
			req.onerror = function(e) {
				reject(e);
			};
			req.open(method, url, true);
			req.send();
		});
	}
	
	/* Logging */
	function debug(message) {
		if(config.debug) console.log(message);
	}
	
	var mime = {
		config: function(c) {
			config.debug = c.debug || config.debug;
		},
		/**
		 * Promises the mime of the resource found at the Url
		 * @Param url
		**/
		get: function(url) {
			return new Promise(function(resolve, reject) {
				requestAsync('HEAD', url).then(function(req) {
					if(req.status != 200) {
						debug('Responsed with bad status, ' + req.status);
						reject();
					} else {
						var m = mimeFromRequest(req);
						if(m == null) {
							reject();
						} else {
							resolve(m);
						}
					}
				}).catch(function(e) {
					debug(e);
					reject();
				});
			});
		}
	};
	return mime;
})();
