const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/weatherstack')

const app = express() 
const port = process.env.PORT || 3000

// Defind paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'NIcK Mee'
    })
})

app.get('/meme', (req, res) => {
    res.render('meme', {
        title: 'Meme',
        text1: 'Me: waking up after taking some drugs',
        text2: 'Everyone at my funeral:',
        name: 'NIcK Mee'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        text1: 'Ferrari <3',
        name: 'NIcK Mee'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        text: 'we can offer you drugs',
        title: 'Help',
        name: 'NIcK Mee'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }

    geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'NIcK Mee',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'NIcK Mee',
        errorMsg: 'Page not found'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})