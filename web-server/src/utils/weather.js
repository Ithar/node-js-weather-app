const chalk = require('chalk');
const got = require('got');
const geoCode = require('./geocoding.js');

const weather =  {
    
    getAppId() {
        return '439d4b804bc8187953eb36d2a8c26a02'; // 801b8b3ed1b1e7d40d3a0f2aa909bf41
    },
    getURL() {
        return 'https://openweathermap.org/data/2.5/weather?appid='+ this.getAppId(); 
    },
    searchByNameGeocode(location) {
        geoCode.search(location, this.searchByLatLng)
    },
    searchByLatLng({lat, lng, location}, callback) {

        (async () => {
            try {
                const url = weather.getURL()+'&lat=' + lat + '&lon=' + lng;
                const response = await got(url, {responseType: 'json'})
                callback(undefined, weather.successResponse(response, location)) 
            } catch(error) {
                console.log(chalk.red('Unable to read weather information at present'))
                console.log(chalk.red('ERROR: ' +error.message))
                callback(weather.errorResponse(error.message), undefined)
            }
        })();
    },
    successResponse(response, location) {

        const body = response.body;
        const temperature = body.main.temp;
        const forcast = body.weather[0].main;
        
        return {
            success : true,
            temperature,
            forcast,
            location    
        }
        
    }, 
    errorResponse(msg) {
        return {
            success: false,
            msg
        }
    }
}

module.exports = weather;