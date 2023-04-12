"use strict";


const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');

//read demand form id(student version)
exports.read = (id) => {
  let found = db.prepare('SELECT role FROM users WHERE id = ?').get(id);
  if (found == 2) {
    found.demand = db.prepare('SELECT * FROM subject WHERE sendid = ? ').all(id);
    return found;
  } else {
    return null;
  }
};
//read demand from id(teacher version)
/*exports.read_demand_teacher = (id) => {
    let found = db.prepare('SELECT role FROM users WHERE id = ?').get(id);
    if (found == 1) {
      found.demand = db.prepare('SELECT * FROM demand WHERE receiveid = ? ').all(id);
      return found;
    } else {
      return null;
    }
  };
//create a demand from id(student)
/*exports.create = function(title,content) {
   //find in user where email = receiveemail -> get id -> this id will be receiveid in demand table 
    db.prepare('INSERT INTO subject (title, content) VALUES (@title, @content)').run(subject).lastInsertRowid;

}*/

exports.creat = function(title,content) {
  const sub = db.prepare('INSERT INTO subject (title,content) VALUES (?, ?)');
  let result= sub.run(title,content);
  return result.lastInsertRowid
}


//update status from id(teacher approve the idea)
exports.update_status = function(id){
    let check = db.prepare('SELECT status FROM demand WHERE id = receiveid').get(id);
    // insert into demand status has changed

}


//change topic from student
exports.update_demand = function(id,receiveid,title,content) {
    
  db.prepare('UPDATE demand SET sendid = @id,receiveid = @receiveid,title = @title, content = @content WHERE id = ?').run(id);
  
}

//delete demand from id
exports.delete = function(id) {
  db.prepare('DELETE FROM demand WHERE id = ?').run(id);
  
}

exports.login = function(email, password) {
  let result = db.prepare('SELECT id FROM user WHERE email = ? AND password = ?').get(email, password);
  if (result === undefined) return -1;
  return result.id;
}

exports.new_user = function(email, password,role) {
  let result = db.prepare('INSERT INTO users (email, password,role) VALUES (?, ?,?)').run(email, password,role);
  return result.lastInsertRowid;
}


