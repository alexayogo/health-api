var express = require('express')
var bodyParser = require('body-parser');
var request = require('request');
var app = express()

var _dirname = '/Users/alexkyriazis/Documents/Human API mock/public/';
var client_secret = '72ea18957af9fe8a1de41b891a77f8389b0fbd03';

app.use(express.static(_dirname));
app.use(bodyParser.json());



app.post('/connect', function (req, res) {
	var sessionTokenObject = req.body;
    sessionTokenObject.clientSecret = client_secret;

	request({
	    method: 'POST',
	    uri: 'https://user.humanapi.co/v1/connect/tokens',
	    json: sessionTokenObject
	}, function(err, resp, body) {
		if(err) {console.log('bad');return res.send(422);}
		res.send(JSON.stringify(body));
	});
});

app.post('/data', function (req, res) {

	var headers = {
	  'Authorization': 'Bearer ' + req.body.access,
	  'Accept': 'application/json'
	};

	var query = req.body.type

	if (query != 'activities' && query != 'activities/summaries' 
		&& query != 'sleeps' && query != 'sleeps/summaries'){

		if (req.body.id){
			query += '/readings/' + req.body.id;
		}else if (req.body.listOrLast != 'last'){
			query += '/readings';
		}
	}else{
		if (req.body.id){
			if (query == 'activities/summaries' || query == 'sleeps/summaries'){
				query = query.replace('/summaries','');
			}
			query += '/' + req.body.id;
		}
	}

	var url = 'https://api.humanapi.co/v1/human/' + query;
	console.log('site is: ', url);

	request({
	  method: 'GET',
	  uri : url,
	  headers : headers
	}, function (error, res_1, body) {
	  var parsedResponse;
	  if (error) {
	    res.send(new Error('Unable to connect to the Human API endpoint.'));
	  } else {
	    if(res_1.statusCode == 401) {
	      console.log("Unauthorized request, validate access token");
	      res.send(null, { status: 'unauthorized' });
	    } else {
	      try {
	        parsedResponse = JSON.parse(body);
	      } catch (error) {
	        return res.send(new Error('Error parsing JSON response from Human API.'));
	      }
	      console.log('parsed: ', parsedResponse);
	      // At this point you can use the JSON object to access the results
	      res.send(JSON.stringify({value:parsedResponse}));
	    }
	  }
	});
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});
