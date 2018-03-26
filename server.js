const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req,res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to append to server log')
        }
    });
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance');
// })

app.use(express.static(__dirname + '/public'))


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>')
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome'
    })
}); //setting an handler, for exemple http address
//  2 argument the function to run, the function that tells express what to send back to the person that made the request
// req = header, body, methods
//  res = functions available...

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
});


app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
}) // binds the app to a location in the machine