"use strict";


let express = require('express');
let mustache = require('mustache-express');

let model = require('./model');
let app = express();


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


const cookieSession = require('cookie-session');
app.use(cookieSession({
  secret: 'mot-de-passe-du-cookie',
}));

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');


function is_authenticated(req, res, next) {
  if (req.session.user !== undefined) {
    return next();
  }
  res.status(401).send('Authentication required');
}


app.use(function(req, res, next) {
  if (req.session.user !== undefined) {
    res.locals.authenticated = true;
    res.locals.name = req.session.name;
  }
  return next();
})

app.post('/login', (req, res) => {
    const user = model.login(req.body.user, req.body.password);
    if (user != -1) {
      req.session.user = user;
      req.session.name = req.body.user;
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  });
  
  app.post('/new_user', (req, res) => {
    const user = model.new_user(req.body.user, req.body.password);
    if (user != -1) {
      req.session.user = user;
      req.session.name = req.body.user;
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  });
  
  app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
  });
  
  app.get('/login', (req, res) => {
    res.render('login');
  });
  
  app.get('/new_user', (req, res) => {
    res.render('new_user');
  });