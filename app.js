var http = require('http');
var url = require('url');
var request = require('request');
var qs = require('qs');
var yametrika = require('yametrika');
var ua = require('universal-analytics');

 
http.createServer(function(req, res){
	var requestURL = url.parse(req.url, true)
	
	if (requestURL['pathname'] == '/track.gif') {
		var imgHex = '47494638396101000100800000dbdfef00000021f90401000000002c00000000010001000002024401003b';
		var imgBinary = new Buffer(imgHex, 'hex');
		res.writeHead(200, {'Content-Type': 'image/gif' });
		res.end(imgBinary, 'binary');

		var queryParam = qs.parse(requestURL.query);
		var YaParam = queryParam.yaparam;
		var GaParam = queryParam.gaparam;
		// console.log('queryParam',queryParam);
		

		if (YaParam && YaParam.id && YaParam.reachGoal) {
			var yaCounter = yametrika.counter({id: YaParam.id});
			yaCounter.req(req);
			yaCounter.reachGoal(YaParam.reachGoal);			
		}

		if (GaParam && GaParam.id && GaParam.category && GaParam.action) {
			var gaCounter = ua(GaParam.id);
			gaCounter.event(GaParam.category,GaParam.action, GaParam.label, GaParam.value).send();

		}
		
		
	} else { 
		res.writeHead(400, {'Content-Type': 'text/plain' });
		res.end('');
	}
}).listen(process.env['PORT'] || 8080); 