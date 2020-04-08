const chalk = require('chalk');
const got = require('got');
const geoCode = require('./geocoding.js');

const weather =  {
    
    getAppId() {
        return 'b6907d289e10d714a6e88b30761fae22'; // 801b8b3ed1b1e7d40d3a0f2aa909bf41
    },
    getURL() {
        return 'https://openweathermap.org/data/2.5/weather?appid='+ this.getAppId(); 
    },
    searchByName(location) {
       
        (async () => {
           
            try {

                const url = this.getURL()+'&q='+location;

                const response = await got(url, {responseType: 'json'})

                const data = response.body;
                const temperature = data.main.temp;
                const forcast = data.weather[0].main;
                
                console.log(chalk.green('The forcast for ' + chalk.blue(location) + ' is ' + chalk.blue(forcast) + ' with a temperature of ' + chalk.blue(temperature) + ' celsius.'))
            } catch (error) {
                console.log(chalk.red('Unable to read weather information at present'))
                console.log(chalk.red('ERROR:' +error.message))
            }
        })();

    },
    searchByNameGeocode(location) {
        geoCode.search(location);
    },
    convertKelvinToCelsius(kelvin) {
        return Math.round((kelvin - 273.15) * 10) / 10 ;
    } 
}

module.exports = weather;