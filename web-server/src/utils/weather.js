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
                callback(undefined, weather.successResponse(response, lat, lng, location)) 
            } catch(error) {
                console.log(chalk.red('Unable to read weather information at present'))
                console.log(chalk.red('ERROR: ' +error.message))
                callback(weather.errorResponse(error.message), undefined)
            }
        })();
    },
    successResponse(response,  lat, lng, location) {

        const body = response.body
        const temperature = Math.round(body.main.temp)
        const temperatureMin = Math.round(body.main.temp_min)
        const temperatureMax = Math.round(body.main.temp_max)
        const forcast = body.weather[0].description
        const windSpeed = body.wind.speed

        return {
            success : true,
            forcast,
            windSpeed,
            temperature,
            temperatureMin,
            temperatureMax,
            location,
            lat,
            lng

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