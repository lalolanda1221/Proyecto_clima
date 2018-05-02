
//Define la direccion para la llamada a la API del clima
var weatherBaseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var weatherQueryParams = '&units=imperial&APPID=faafe3bfd7fe2f3413bf1dc88110f119';

//Crea la funcion que generara la cadena HTML
//y despues añadirá esa cadena a la pagina
function createHTML(cityName, tempValue){
	var bgClass;
	if (tempValue >= 90){
		bgClass = 'redBg';
	}
	else if (tempValue < 90 && tempValue >= 80){
		bgClass = 'orangeBg';
	}
	else if (tempValue < 80 && tempValue >= 70){
		bgClass = 'yellowBg';
	}
	else if (tempValue < 70 && tempValue >= 60){
		bgClass = 'greenBg';
	}
	else if (tempValue < 60 && tempValue >= 50){
		bgClass = 'blueBg';
	}
	else{
		bgClass = 'grayBg';
	}

	var htmlString =	'<div class="setBorder ' + bgClass + '">' +
											'<div class="weatherCity">' + cityName + '</div>' +
											'<div class="weatherData">' + tempValue + '</div>' +
										'</div>';
	$('#weatherResults').prepend(htmlString);
}

//Crea una funcion que ejecuta la llamada AJAX de Clima
var searchWeather = function(city){

	var searchURL = weatherBaseURL + city + weatherQueryParams;
	$.ajax({
		url: searchURL,
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log("Tenemos problemas");
			console.log(data.status);
			alert("Oh no. Algo fallo...");
		},
		success: function(data){
			console.log("Muy bien!");
			//Revisa la consola del navegador para ver los datos devueltos 
			console.log(data);
			//Verifica que la respuesta recibida sea correcta
			if (data.cod === '404'){
				alert("Oh no. Algo salio mal. Intenta con otra ciudad.");
								return;
			}

			$("#query").val('');

			var theCity = data.name || '????';
			var theTemp = Math.round(data.main.temp) || 70;

			//Llama una funcion que creara el HTML
			createHTML(theCity, theTemp);
		}
	});
};

//El codigo a ejecutarse una vez que la pagina ha terminado de cargar
$(document).ready(function(){
	console.log("LOADED!!!!");

		$("#search").on('click', function(){
		console.log("Clicked search");
			var newSearchTerm = $("#query").val();
		console.log(newSearchTerm);
			searchWeather(newSearchTerm);
		$("#search").blur();
	});

	$('#query').on('keypress', function(e){
			if (e.which == 13){
					$("#search").trigger('click');
		}
	});
});
