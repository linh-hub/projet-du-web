"use strict";

const fs = require('fs');
const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');
let infos = JSON.parse(fs.readFileSync('datauser.json').toString());
let role = JSON.parse(fs.readFileSync('datarole.json').toString());
let demand = JSON.parse(fs.readFileSync('datademand.json').toString());

let load = function() {

  db.prepare('DROP TABLE IF EXISTS users').run();
  db.prepare('DROP TABLE IF EXISTS roles').run();
  db.prepare('DROP TABLE IF EXISTS demands').run();

  db.prepare('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, email TEXT, role INTEGER NOT NULL REFERENCES roles(id))').run();
  db.prepare('CREATE TABLE roles (id INTEGER PRIMARY KEY, role TEXT)').run();
  db.prepare('CREATE TABLE demands (id INTEGER PRIMARY KEY AUTOINCREMENT, userid INTEGER REFERENCES users(id),title TEXT, content TEXT, status BOOLEAN)').run();

  let insert1 = db.prepare('INSERT INTO users (firstname, lastname, email, role) VALUES (@firstname, @lastname, @email, @role)');
  let insert2 = db.prepare('INSERT INTO roles (id, role) VALUES (@id, @role)'); 
  let insert3 = db.prepare('INSERT INTO demands (userid, title, content, status) VALUES (@userid, @title, @content, @status)');
  let transaction = db.transaction(() => {
    for(let u of infos){
      let role = db.prepare('SELECT id FROM roles WHERE role = ?').get(u.role);
      if (!role) { 
        console.error(`role '${u.role}' , user '${u.firstname}`); continue; } 
        u.role = role.id; 
        insert1.run(u); 
    } 
    for(let r of role){
       insert2.run(r); 
    } 
    for(let d of demand){ 
      let user = db.prepare('SELECT id FROM users WHERE id = ?').get(d.userid); 
      if (!user) { 
        console.error(`user id '${d.userid}'  demand '${d.title}`); continue; } 
        d.userid = user.id; insert3.run(d); 
    } 

}); 
transaction(); }
load();

