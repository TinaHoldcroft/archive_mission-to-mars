// Connect to weather API
(function() {
    fetchWeather("https://api.nasa.gov/insight_weather/?api_key=PrX94SpxNWPcPdp8J8YuJRhYnCvWRzju5Avu3srO&feedtype=json&ver=1.0",
        function(weatherData){
            weatherForcast(weatherData);
            marsWeather = weatherData;
        });
})()

var marsWeather = null;

function fetchWeather(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status >= 200 && xhr.status < 300) {
            var weatherData = JSON.parse(xhr.responseText);
            callback(weatherData);
        }
        else {
            alert('Error fetching weather data');
        }
    }
    xhr.open("GET", url);
    xhr.send();
}

// Weather display
function weatherForcast(marsWeather) {
    var daySol = document.querySelector(".day-sol");
    var dayDate = document.querySelector(".day-date");
    var dayHigh = document.querySelector(".day-high");
    var dayLow = document.querySelector(".day-low");
    var dayWind = document.querySelector(".dayWind");
    var day3Pressure = document.querySelector(".dayPressure");
    var forcast7days = document.querySelector(".forcast7");

    for (var i = 0; i < 7; ++i) {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var forcast = document.querySelector(".forcast" + (i + 1));
        var month = months[parseInt(marsWeather[marsWeather.sol_keys[i]].First_UTC.substring(5, 7))-1];
        var day = marsWeather[marsWeather.sol_keys[i]].First_UTC.substring(8,10);

        if((marsWeather.validity_checks[marsWeather.sol_keys[i]].AT.valid == true) && (marsWeather.validity_checks[marsWeather.sol_keys[i]].HWS.valid == true) && (marsWeather.validity_checks[marsWeather.sol_keys[i]].PRE.valid == true) && (i == 6)) {
            daySol.innerHTML = 'Sol ' + marsWeather.sol_keys[i];
            dayDate.innerHTML =  month + ' ' + day
            dayHigh.innerHTML = '<span class="calcTemp">' + marsWeather[marsWeather.sol_keys[i]].AT.mx.toFixed(0) + '</span>°';
            dayLow.innerHTML =  '<span class="calcTemp">' + marsWeather[marsWeather.sol_keys[i]].AT.mn.toFixed(0) + '</span>°';
            dayWind.innerHTML =  marsWeather[marsWeather.sol_keys[i]].HWS.av.toFixed(2) + ' m/s';
            day3Pressure.innerHTML =  marsWeather[marsWeather.sol_keys[i]].PRE.av.toFixed(0) + ' Pa';

            forcast7days.innerHTML =
                '<p> Sol ' + marsWeather.sol_keys[6] + '</p>' +
                '<p>' + month + ' ' + day + '</p>' +
                '<p>High: ' + marsWeather[marsWeather.sol_keys[6]].AT.mx.toFixed(0) + '°C</p>' +
                '<p>Low: ' + marsWeather[marsWeather.sol_keys[6]].AT.mn.toFixed(0) + '°C </p>' +
                '<p>' + marsWeather[marsWeather.sol_keys[6]].HWS.av.toFixed(2) + ' Pa </p>' +
                '<p>' + marsWeather[marsWeather.sol_keys[6]].PRE.av.toFixed(0) + ' m/s </p>';
        } 
        else if((marsWeather.validity_checks[marsWeather.sol_keys[i]].AT.valid == true) && (marsWeather.validity_checks[marsWeather.sol_keys[i]].HWS.valid == true) && (marsWeather.validity_checks[marsWeather.sol_keys[i]].PRE.valid == true)) {
            forcast.innerHTML =
                '<p> Sol ' + marsWeather.sol_keys[i] + '</p>' +
                '<p>' + month + ' ' + day + '</p>' +
                '<p>High: ' + marsWeather[marsWeather.sol_keys[i]].AT.mx.toFixed(0) + '°C</p>' +
                '<p>Low: ' + marsWeather[marsWeather.sol_keys[i]].AT.mn.toFixed(0) + '°C </p>' +
                '<p>' + marsWeather[marsWeather.sol_keys[i]].HWS.av.toFixed(2) + ' Pa </p>' +
                '<p>' + marsWeather[marsWeather.sol_keys[i]].PRE.av.toFixed(0) + ' m/s </p>';
        }
    }
}

// Change display to fahrenheit
function fahrenheit(clickedButton) {
    var celsiusHigh = document.querySelector(".celsius-high");
    var celsiusLow = document.querySelector(".celsius-low");
    var fahrenheitHigh = document.querySelector(".fahrenheit-high");
    var fahrenheitLow = document.querySelector(".fahrenheit-low");
    var tempDisplay = document.querySelectorAll(".degree_indicator");
    var calculateTemperature = document.querySelectorAll(".calcTemp");
    var toFahrenheit = marsWeather[marsWeather.sol_keys[0]].AT.mx.toFixed(0) * 9 / 5 + 32;
    console.log ('Changed to fahrenheit');

    if(clickedButton.classList.contains("switchTemp") == false) {
        celsiusHigh.classList.remove("switchTemp");
        celsiusLow.classList.remove("switchTemp");
        fahrenheitHigh.classList.add("switchTemp");
        fahrenheitLow.classList.add("switchTemp");

        for (i = 0; i < calculateTemperature.length; i++) {
            if(!isNaN(calculateTemperature[i].innerHTML)) { 
                var toFahrenheit = calculateTemperature[i].innerHTML * 9 / 5 + 32;
                calculateTemperature[i].innerHTML = toFahrenheit.toFixed(0);
            } 
        }
        for (i = 0; i < tempDisplay.length; i++) {
            tempDisplay[i].innerHTML = "F";
        }
    }
}

// Change display to celsius
function celsius(clickedButton) {
    var celsiusHigh = document.querySelector(".celsius-high");
    var celsiusLow = document.querySelector(".celsius-low");
    var fahrenheitHigh = document.querySelector(".fahrenheit-high");
    var fahrenheitLow = document.querySelector(".fahrenheit-low");
    var tempDisplay = document.querySelectorAll(".degree_indicator");
    var calculateTemperature = document.querySelectorAll(".calcTemp");
    console.log ('Changed to celsius');

    if(clickedButton.classList.contains("switchTemp") == false) {
        celsiusHigh.classList.add("switchTemp");
        celsiusLow.classList.add("switchTemp");
        fahrenheitHigh.classList.remove("switchTemp");
        fahrenheitLow.classList.remove("switchTemp");

        for (i = 0; i < calculateTemperature.length; i++) {
            if(!isNaN(calculateTemperature[i].innerHTML)) {
                var toCelsius = (calculateTemperature[i].innerHTML -32) * 5 / 9;
                calculateTemperature[i].innerHTML = toCelsius.toFixed(0);
            }
        }
        for (i = 0; i < tempDisplay.length; i++) {
            tempDisplay[i].innerHTML = "C";
        }
    }
}