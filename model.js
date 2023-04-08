"use strict";


const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');

//read demand form id(student version)
exports.read_demand_student = (id) => {
  let found = db.prepare('SELECT * FROM user WHERE id = ?').get(id);
  if (found !== undefined) {
    found.demand = db.prepare('SELECT * FROM demand WHERE sendid = ? ').all(id);
    return found;
  } else {
    return null;
  }
};
//read demand from id(teacher version)
exports.read_demand_teacher = (id) => {
    let found = db.prepare('SELECT * FROM user WHERE id = ?').get(id);
    if (found !== undefined) {
      found.demand = db.prepare('SELECT * FROM demand WHERE receiveid = ? ').all(id);
      return found;
    } else {
      return null;
    }
  };

//create a demand from id(student)
exports.create_demand = function(id, receiveid, title,content) {
    
    
    db.prepare('INSERT INTO demand (sendid, receiveid,title, content) VALUES (@sendid,@receiveid,@title, @content)').run(demand).lastInsertRowid;
 
}
//update status from id(teacher approve the idea)
exports.update_status = function(id){
    let change = db.prepare('SELECT status FROM demand WHERE id = receiveid').get(id);
    if (found == 1) {
        send_noti(id);
    }
    else{
        return null;
    }
    
}
//send notification to student
exports.send_noti = function(id){
    let found = db.prepare('SELECT sendid FROM demand WHERE id = receiveid').get(id);


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

exports.new_user = function(firstname,lastname,email, password) {
  let result = db.prepare('INSERT INTO user (firstname,lastname,email, password) VALUES (?,?,?, ?)').run(firstname,lastname,email, password);
  return result.lastInsertRowid;
}


