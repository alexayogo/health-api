
var connectBtn = document.getElementById('connect-health-data-btn');
var existingBtn = document.getElementById('existing-btn');

var sessionToken;
if (connectBtn){
  connectBtn.addEventListener('click', function(e) {
        var opts = {
      // grab this from the app settings page
      clientId: client_id,
      // can be email or any other internal id of the user in your system
      clientUserId: 'UNIQUE_USER_ID_IN_YOUR_APPLICATION_5',
      finish: function(err, sessionTokenObject) {
        // When user finishes health data connection to your app
        // `finish` function will be called.
        // `sessionTokenObject` object will have several fields in it.
        // You need to pass this `sessionTokenObject` object to your server
        // add `CLIENT_SECRET` to it and send `POST` request to the `https://user.humanapi.co/v1/connect/tokens` endpoint.
        // In return you will get `accessToken` for that user that can be used to query Human API.

        var oReq = new XMLHttpRequest();
        oReq.onload = function(){
          console.log('created new user');
          console.log('after sent: ',oReq.responseText);

          sessionToken = JSON.parse(oReq.responseText);
        };

        oReq.open('post','http://localhost:3000/connect');
        oReq.setRequestHeader('Content-Type','application/json');
        oReq.send(JSON.stringify(sessionTokenObject));

      },
      close: function() {
        // do something here when user just closed popup
        // `close` callback function is optional
      }
    }
    HumanConnect.open(opts);
  });
}

if (existingBtn){
  existingBtn.addEventListener('click', function(e) {
    if (!sessionToken){
        alert('no data, connect your data!');
    }else{
        window.location.replace('http://localhost:3000/existing.html?access='+encodeURIComponent(sessionToken.accessToken));
    }
  });
}