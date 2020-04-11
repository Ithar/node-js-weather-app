// Core modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')
// Project files
const geo = require('./utils/geocoding')
const weather = require('./utils/weather')

const app = express()

// Path configs 
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../public/templates/views')
const viewsPartialsDir = path.join(__dirname, '../public/templates/partials')

// ##########
// Settings
// ##########

// -- views 
app.set('views', viewsDir)
app.set('view engine', 'hbs')
hbs.registerPartials(viewsPartialsDir)

// ###########
// REST APIS
// ###########
app.get('/weather', (req, res) => {

    const address = req.query.address

    if (address === undefined) {
        return res.send({
            error : 'Please enter address'
        })
    }

    const data = geo.search(address, weather.searchByLatLng)

    res.send({
        'address' : address,
    })
})

// ##########
// Routes
// ##########

app.use(express.static(publicDir))

// -- index
app.get('', (req, res) => {
    res.render('index', {
        pageHeader : 'Welcome to the Weather'
    })
})

// -- about
app.get('/about', (req, res) => {
    res.render('about', {
        pageHeader: 'About the Weather site'
    })
})

// -- 404
app.get('*', (req, res) => {
    res.render('404')
})



app.listen(3000, () => {
    console.log('Express server is up and running !');
})