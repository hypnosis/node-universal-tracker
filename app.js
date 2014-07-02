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

		if (YaParam && YaParam.id) {
			var yaCounter = yametrika.counter({id: YaParam.id});
				yaCounter.req(req);

			// Test Yaparam http://localhost:8080/track.gif?yaparam[id]=22718770&yaparam[reachGoal][target]=buy&yaparam[reachGoal][params][order]=1&yaparam[reachGoal][params][order2]=2
			if (YaParam.reachGoal && typeof YaParam.reachGoal.target == 'string') {
				
				var goalParams = YaParam.reachGoal.params && typeof YaParam.reachGoal.params == 'object' || {};
				yaCounter.reachGoal(YaParam.reachGoal.target, goalParams);			
			}

			// Test Yaparam http://localhost:8080/track.gif?yaparam[id]=22718770&yaparam[hit][url]=http://YOUR.HOST
			if (YaParam.hit && YaParam.hit.url) {

				var hitParams = YaParam.hit.params && typeof YaParam.hit.params == 'object' || {};
				var hitTitle = YaParam.hit.title || '';
				var hitReferer = YaParam.hit.referer || YaParam.hit.url;
				
				yaCounter.hit(YaParam.hit.url, hitTitle, hitReferer, hitParams);
			}
		}

		if (GaParam && GaParam.id) {
			var gaCounter = ua(GaParam.id);
			
			// http://tracker.tentak.li/track.gif?&gaparam[id]=UA-45217027-1&gaparam[category]=test&gaparam[action]=buy&gaparam[label]=label
			if (GaParam.event && GaParam.event.category && GaParam.event.action) {
				gaCounter.event(GaParam.event.category,GaParam.event.action, GaParam.event.label, GaParam.event.value).send();				
			}

			// http://tracker.tentak.li/track.gif?&gaparam[id]=UA-45217027-1&gaparam[pageview][page]='/buy'&gaparam[pageview][hostname]=http://HOST.NAME&gaparam[pageview][title]=some_title
			if (GaParam.pageview && GaParam.pageview.page && GaParam.pageview.hostname) {
				gaCounter.pageview(GaParam.pageview.page,GaParam.pageview.title || '',GaParam.pageview.hostname).send();
			}

			
		}

		
		
		
	} else { 
		res.writeHead(400, {'Content-Type': 'text/plain' });
		res.end('');
	}
}).listen(process.env['PORT'] || 8080); 