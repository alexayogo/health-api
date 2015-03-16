var client_id = '6294226afa7027117a28b9599869becabdcb6a60';

function connect(){

    var opts = {
      // grab this from the app settings page
      clientId: client_id,
      // can be email or any other internal id of the user in your system
      clientUserId: 'UNIQUE_USER_ID_IN_YOUR_APPLICATION_1',
      finish: function(err, sessionTokenObject) {
        // When user finishes health data connection to your app
        // `finish` function will be called.
        // `sessionTokenObject` object will have several fields in it.
        // You need to pass this `sessionTokenObject` object to your server
        // add `CLIENT_SECRET` to it and send `POST` request to the `https://user.humanapi.co/v1/connect/tokens` endpoint.
        // In return you will get `accessToken` for that user that can be used to query Human API.

        var oReq = new XMLHttpRequest();
        return oReq.onload = function(){
          console.log('created new user');
        	return JSON.parse(oReq.responseText);
        };

        oReq.open('post','http://localhost:3000/connect');
        oReq.setRequestHeader("Content-Type",'application/json');
        oReq.send(JSON.stringify(sessionTokenObject));

      },
      close: function() {
        // do something here when user just closed popup
        // `close` callback function is optional
      }
    }
    HumanConnect.open(opts);
}


 /* TYPE
 * --------
 * activities
 * activities/summaries
 * blood_glucose
 * blood_oxygen
 * blood_pressure
 * bmi
 * body_fat
 * height
 * heart_rate
 * sleeps
 * sleeps/summaries
 * weight
 * 
 * listOrLast doesn't apply to activities, activities/summaries, sleeps, sleeps/summaries
 */

function getData(accessToken, type, listOrLast, id){

	return new Promise(function(res,rej){
		var oReq = new XMLHttpRequest();
		oReq.onload = function(){
			var result = JSON.parse(this.responseText).value;
			console.log(result);
			res(result);
		};

		oReq.open('post','http://localhost:3000/data');
		oReq.setRequestHeader("Content-type",'application/json');
		oReq.send(JSON.stringify({access: accessToken, type: type, listOrLast:listOrLast, id:id}));
	});
}