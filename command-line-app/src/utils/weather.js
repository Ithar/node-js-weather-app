const chalk = require('chalk');
const got = require('got');
const geoCode = require('./geocoding.js');

const weather =  {
    
    getAppId() {
        return '439d4b804bc8187953eb36d2a8c26a02';// 801b8b3ed1b1e7d40d3a0f2aa909bf41
    },
    getURL() {
        return 'https://openweathermap.org/data/2.5/weather?appid='+ this.getAppId(); 
    },
    searchByName(location) {
       
        (async () => {
           
            try {
                const url = this.getURL()+'&q=' + encodeURIComponent(location);
                const response = await got(url, {responseType: 'json'})
                this.displayWeatherResponse(response, location)
            } catch (error) {
                console.log(chalk.red('Unable to read weather information at present'))
                console.log(chalk.red('ERROR: ' +error.message))
            }
        })();

    },
    searchByNameGeocode(location) {
        geoCode.search(location, this.searchByLatLng)
    },
    searchByLatLng({lat, lng, location}) {
        (async () => {
            try {
                const url = weather.getURL()+'&lat=' + lat + '&lon=' + lng;
                const response = await got(url, {responseType: 'json'})
                weather.displayWeatherResponse(response, location)
            } catch (error) {
                console.log(chalk.red('Unable to read weather information at present via lat/lng'))
                console.log(chalk.red('ERROR: ' +error.message))
            }
        })();
    },
    displayWeatherResponse(response, location) {

        const data = response.body;
        const temperature = data.main.temp;
        const forcast = data.weather[0].main;
        const country = data.sys.country;
        
        console.log(chalk.green('The forcast for ' + chalk.blue(location + ' ' + country) + ' is ' + chalk.blue(forcast) + ' with a temperature of ' + chalk.blue(temperature) + ' celsius.'))
    }
}

module.exports = weather;