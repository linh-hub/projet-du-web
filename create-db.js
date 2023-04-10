"use strict";

const fs = require('fs');
const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');
let user = JSON.parse(fs.readFileSync('datauser.json').toString());
//let role = JSON.parse(fs.readFileSync('datarole.json').toString());
let demand = JSON.parse(fs.readFileSync('datademand.json').toString());

let load = function() {
  

  db.prepare('DROP TABLE IF EXISTS demands').run();
  db.prepare('DROP TABLE IF EXISTS users').run();
  //db.prepare('DROP TABLE IF EXISTS roles').run();

  //db.prepare('CREATE TABLE roles (id INTEGER PRIMARY KEY, role INTERGER NOT NULL UNIQUE)').run();
  db.prepare('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT NOT NULL, email TEXT NOT NULL UNIQUE,role TEXT NOT NULL, password TEXT NOT NULL)').run();
  db.prepare('CREATE TABLE demands (id INTEGER PRIMARY KEY AUTOINCREMENT, sendid INTEGER NOT NULL REFERENCES users(id), receiveid INTEGER NOT NULL REFERENCES users(id), title TEXT NOT NULL, content TEXT NOT NULL, status BOOLEAN DEFAULT 0)').run();

  //let insert1 = db.prepare('INSERT INTO roles (id, role) VALUES (@id, @role)'); 
  let insert2 = db.prepare('INSERT INTO users (firstname, lastname, email,role, password) VALUES (@firstname, @lastname, @email,@role,@password)');
  let insert3 = db.prepare('INSERT INTO demands (sendid, receiveid, title, content, status) VALUES (@sendid, @receiveid, @title, @content, @status)');
  
  let transaction = db.transaction(() => {
    /*for(let r of role){
      if (!r.id || !r.role) { 
        console.error(`Missing fields in role: ${JSON.stringify(r)}`); 
        continue; 
      }
      insert1.run(r); 
    }*/
    for(let u of user){
      if (!u.firstname || !u.lastname || !u.email ||!u.role ||!u.password ) { 
        console.error(`Missing fields in user: ${JSON.stringify(u)}`); 
        continue; 
      }
      
      insert2.run(u); 
    } 
    for(let d of demand){ 
      if (!d.sendid || !d.receiveid || !d.title || !d.content || !d.status) { 
        console.error('Missing fields in demand');
      }
      let sendUser = db.prepare('SELECT id FROM users WHERE id = ?').get(d.sendid);
      let receiveUser = db.prepare('SELECT id FROM users WHERE id = ?').get(d.receiveid);
      if (!sendUser || !receiveUser) { 
        console.error(`Invalid send/receive user ID for demand: ${JSON.stringify(d)}`);
        continue;
      }
      insert3.run(d);
    }
  })
  transaction();
}

load();

