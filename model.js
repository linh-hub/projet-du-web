"use strict";


const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');

exports.login = function(user, password) {
    let result = db.prepare('SELECT id FROM user WHERE name = ? AND password = ?').get(user, password);
    if (result === undefined) return -1;
    return result.id;
  }
  
  exports.new_user = function(user, password) {
    let result = db.prepare('INSERT INTO user (name, password) VALUES (?, ?)').run(user, password);
    return result.lastInsertRowid;
  }