"use strict";

const fs = require('fs');
const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');

let entries = JSON.parse(fs.readFileSync('data.json').toString());
let load = function(filename) {
  const recipes = JSON.parse(fs.readFileSync(filename));
}
  db.prepare('DROP TABLE IF EXISTS users').run();
  db.prepare('DROP TABLE IF EXISTS roles').run();
  db.prepare('DROP TABLE IF EXISTS demands').run();

  db.prepare('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, email TEXT, role INT, FOREIGN KEY(roles) REFERENCES roles(id))').run();
  db.prepare('CREATE TABLE roles (id INT PRIMARY KEY, role TEXT)').run();
  db.prepare('CREATE TABLE demands (id INT PRIMARY KEY AUTOINCREMENT, studentid INT,  teacherid INT,title TEXT, content TEXT, status BOOL FOREIGN KEY(users) REFERENCES users(id))').run();

  let insert1 = db.prepare('INSERT INTO users VALUES (@id, @firstname, @lastname, @email, @role)');
  let insert2 = db.prepare('INSERT INTO roles VALUES (@value, @role)');
  let insert3 = db.prepare('INSERT INTO demands VALUES (@id, @studentid, @teacherid,@title,@content,@status)');


load('data.json');

db.prepare('DROP TABLE IF EXISTS user').run();
db.prepare('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT)').run();
db.prepare("INSERT INTO user (name, password) VALUES ('admin', 'miam')").run();
