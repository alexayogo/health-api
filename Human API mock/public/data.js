var accessToken = getParameterByName('access');
console.log('here',accessToken);

var steps = document.getElementById("steps");
var calories = document.getElementById("calories");


getData(accessToken,'activities/summaries','last').then(function(data){

	if (data.length){
		var activity = data[0];
		steps.innerHTML = activity.steps;
		calories.innerHTML = activity.calories;
	}else{
		alert('no data collected yet!');
		steps.innerHTML = '-';
		calories.innerHTML = '-';
	}


});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

