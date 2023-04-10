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

  //db.prepare('CREATE TABLE roles (id INTEGER PRIMARY KEY, role TEXT NOT NULL UNIQUE)').run();
  db.prepare('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT NOT NULL, email TEXT NOT NULL UNIQUE)').run();
  db.prepare('CREATE TABLE demands (id INTEGER PRIMARY KEY AUTOINCREMENT, sendid INTEGER NOT NULL REFERENCES users(id), receiveid INTEGER NOT NULL REFERENCES users(id), title TEXT NOT NULL, content TEXT NOT NULL, status BOOLEAN DEFAULT 0)').run();

  //let insert1 = db.prepare('INSERT INTO roles (id, role) VALUES (@id, @role)'); 
  let insert2 = db.prepare('INSERT INTO users (firstname, lastname, email) VALUES (@firstname, @lastname, @email)');
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
      if (!u.firstname || !u.lastname || !u.email ) { 
        console.error(`Missing fields in user: ${JSON.stringify(u)}`); 
        continue; 
      }
      /*let role = db.prepare('SELECT id FROM roles WHERE role = ?').get(u.role);
      if (!role) { 
        console.error(`Invalid role '${u.role}' for user '${u.firstname}'`); 
        continue; 
      } 
      u.role = role.id; 
      */
      insert2.run(u); 
    } 
    for(let d of demand){ 
      if (!d.sendid || !d.receiveid || !d.title || !d.content) { 
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
