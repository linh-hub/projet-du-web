"use strict";


let express = require('express');
let mustache = require('mustache-express');

let model = require('./modelsubject');
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
  if (req.session.student !== undefined) {
    return next();
  }
  res.status(401).send('Authentication required');
}


app.use(function(req, res, next) {
  if (req.session.student !== undefined) {
    res.locals.authenticated = true;
    res.locals.id = req.session.id;
  }
  return next();
})

app.post('/login', (req, res) => {
    const student = model.login(req.body.student, req.body.password);
    if (user != -1) {
      req.session.student = student;
      req.session.firstname = req.body.user;
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  });
  
  app.post('/new_student', (req, res) => {
    const user = model.new_student(req.body.student, req.body.password);
    if (user != -1) {
      req.session.student = student;
      req.session.firstname = req.body.user;
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
  app.get('/read/:id', (req, res) => {
    let entry = model.read(req.params.id);
    res.render('read', entry);
  });
  
  app.get('/create', is_authenticated, (req, res) => {
    res.render('create');
  })

 

  
  app.listen(3000, () => console.log('listening on http://localhost:3000'));