require('colors');

var fetchWeather = require('./fetch-weather');
var prepareForWeather = require('./prepared-for-the-weather');

var commandLineArgs = require("command-line-args");

// Define CLI options correctly
var optionDefinitions = [
    { name: "location", alias: "l", type: String, defaultValue: "London" }
];

var cli = commandLineArgs(optionDefinitions);  // Correct way to use command-line-args
var options = cli;  // No need for .parse()
var location = options.location;  // Extract location properly

/* Fetch weather data */
fetchWeather.fetchWeather(location,
    function(today){

        /* Get list of kit needed to survive the weather */
        var weatherKit = [
            {'name' : 'Umbrella',   'value': prepareForWeather.doINeed.umbrella(today)},
            {'name' : 'Suncream',   'value': prepareForWeather.doINeed.suncream(today)},
            {'name' : 'Jumper',     'value': prepareForWeather.doINeed.jumper(today)},
            {'name' : 'Water',      'value': prepareForWeather.doINeed.water(today)},
        ];

        /* Iterate over each item and print to console */
        for (let key in weatherKit){
            printLine(weatherKit[key].value, weatherKit[key].name);
        }
    }
);

/* Prints to console with nice colors and symbols */
function printLine(required, text){
    if(required){ console.log((String.fromCharCode(10004)+" "+text).green);}
    else{console.log((String.fromCharCode(10006)+" "+text).red);}
}
