const path = require('path')
const express = require('express')

const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../views')

const app = express()

// Settings
app.set('views', viewsDir)
app.set('view engine', 'hbs')

// Static Path
app.use(express.static(publicDir))

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        header : 'Weather'
    })
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