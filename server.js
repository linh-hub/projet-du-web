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
    res.locals.email = req.session.email;
  }
  return next();
})

app.post('/login', (req, res) => {
    const student = model.login(req.body.users, req.body.password);
    if (user != -1) {
      req.session.user = user;
      req.session.email = req.body.email;
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  });
  
  app.post('/new_user', (req, res) => {
    const user = model.new_user(req.body.firstname, req.body.lastname, req.body.email);
    if (user != -1) {
      req.session.user = user;
      req.session.firstname = firstname;
      req.session.lastname = req.body.lastname;
      req.session.email = req.body.email;
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

  app.get('/', (req, res) => {
    res.render('index');
  });


  app.get('/read/:id', (req, res) => {
    let entry = model.read(req.params.id);
    res.render('read', entry);
  });
  
  app.get('/create', is_authenticated, (req, res) => {
    res.render('create');
  });

  app.get('/update/:id', is_authenticated, (req, res) => {
    let entry = model.read(req.params.id);
    res.render('update', entry);
  });
  
  app.get('/delete/:id', is_authenticated, (req, res) => {
    let entry = model.read(req.params.id);
    res.render('delete', {id: req.params.id, title: entry.title});
  });
  
  function post_data_to_demand(req) {
    return {
      sendid: req.body.sendid, 
      receiveid: req.body.receiveid,
      title: req.body.title,
      content: req.body.content,
      status: req.body.istatus
      
    };
  }
  
  app.post('/create', is_authenticated, (req, res) => {
    let id = model.create(post_data_to_demand(req));
    res.redirect('/read/' + id);
  });
  
  app.post('/update/:id', is_authenticated, (req, res) => {
    let id = req.params.id;
    model.update(id, post_data_to_demand(req));
    res.redirect('/read/' + id);
  });
  
  app.post('/delete/:id', is_authenticated, (req, res) => {
    model.delete(req.params.id);
    res.redirect('/');
  });

  app.listen(3003, () => console.log('listening on http://localhost:3000'));
  const express = require('express');
  const low = require('lowdb');
  const FileSync = require('lowdb/adapters/FileSync');
  const bodyParser = require('body-parser');
  const app = express();
  const port = 3000;

  const adapter = new FileSync('db.json');
  const db = low(adapter);

  db.defaults({ sujets: [] }).write();

  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get('/sujets', (req, res) => {
    const sujets = db.get('sujets').value();
    res.send(sujets);
  });

  app.post('/sujets', (req, res) => {
    db.get('sujets').push(req.body).write();
    res.send(req.body);
  });

  app.delete('/sujets/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.get('sujets').remove({ id }).write();
    res.sendStatus(200);
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
