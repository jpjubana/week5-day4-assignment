/*****************************Modules***************************/

const express = require('express')
const parseurl = require('parseurl')
const session = require('express-session')
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const path = require('path');

var app = express()

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache')

/*****************************Middleware***************************/

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(function(req, res, next) {

    const credntls = req.session.credntls = { 'username': 'password' };

    next()
});

/**********************************Routes***************************/

app.get("/", function(req, res) {
    if (Object.keys(req.session.credntls) === 'username') {
        res.send("Welcome, " + Object.keys(req.session.credntls));
    } else {
        res.render('index');
    }
});

app.post("/login", function(req, res) {
    const users = {};
    Object.defineProperty(users, req.body.username, { value: req.body.password });
    if (req.session.credntls.username === users.username) {
        res.redirect('/');
    } else {
        res.send("Try again sucka!");
    }
});

/**********************************Get shit going***************************/

app.listen(3000, () => console.log("Ninja We init!"));