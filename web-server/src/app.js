const path = require('path')
const express = require('express')
const hbs = require('hbs')

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

// ###########
// REST APIS
// ###########
app.get('/weather', (req, res) => {
    res.send({
        key1 : 'value1',
        key2 : 'value2',
    })
})

app.listen(3000, () => {
    console.log('Express server is up and running !');
})