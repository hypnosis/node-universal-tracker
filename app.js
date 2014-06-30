var http = require('http');
var url = require('url');
var request = require('request');
 
http.createServer(function(req, res){
	var requestURL = url.parse(req.url, true)
	
	if (requestURL['pathname'] == '/track.gif') {
		var imgHex = '47494638396101000100800000dbdfef00000021f90401000000002c00000000010001000002024401003b';
		var imgBinary = new Buffer(imgHex, 'hex');
		res.writeHead(200, {'Content-Type': 'image/gif' });
		res.end(imgBinary, 'binary');
		
		var trackUrl = requestURL.query && requestURL.query.track ? requestURL.query.track : null;
	
		if (trackUrl) {
			request.post(trackUrl);
		}	
	} else { 
		res.writeHead(400, {'Content-Type': 'text/plain' });
		res.end('');
	}
}).listen(8080); 