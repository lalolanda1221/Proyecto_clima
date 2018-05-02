//Define una funcion de llamada cunado el boton es presionado
function getWeatherInfo(){
	console.log("Obteniendo informacion del clima!");
	var theInputBox = document.getElementById('query');
	var theInputValue = theInputBox.value;
	console.log(theInputValue);

	var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&q=';
	var apiID = "&APPID=YOUR-APP-ID";
	var searchURL = weatherURL + theInputValue + appID;

	$.getJSON(searchURL,
			function(data){
				console.log(data);
				var theTemperature = "???";
				if (data.cod === '404'){
					alert("Oh no. Vuelve a intentar.");
					return;
				}
				console.log(data.main.temp);
				theTemperature = data.main.temp;
				var theResult = document.getElementById('weatherResults');
				theResult.innerHTML = "La temperatura en " + theInputValue + " es " + theTemperature;
			}
	);
}

var theButton = document.getElementById('search');
//Asigna un evento al boton
theButton.onclick = getWeatherInfo;
theButton.addEventListener('click', getWeatherInfo);
