"use strict";


const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');

//read demand form id(student version)
exports.read = (id) => {
  let found = db.prepare('SELECT role FROM users WHERE id = ?').get(id);
  if (found == student) {
    found.demand = db.prepare('SELECT * FROM demands WHERE sendid = ? ').all(id);
    return found;
  } else {
    found.demand = db.prepare('SELECT * FROM demands WHERE receiveid = ? ').all(id);
  }
};



//create a demand from id(student)
exports.create = function() {
   //find in user where email = receiveemail -> get id -> this id will be receiveid in demand table
    
    
    db.prepare('INSERT INTO demands (sendid, receiveid,title, content) VALUES (@sendid,@receiveid,@title, @content)').run(demand).lastInsertRowid;
 
}
//update status from id(teacher approve the idea)
exports.update_status = function(id){
    let check = db.prepare('UPDATE status FROM demands WHERE id = receiveid').get(id);
    // insert into demand status has changed

}


//change topic from student 
exports.update_demand = function(id,receiveid,title,content) {
    
  db.prepare('UPDATE demands SET sendid = @id,receiveid = @receiveid,title = @title, content = @content WHERE id = ?').run(id);
  
}

//delete demand from id
exports.delete = function(id) {
  db.prepare('DELETE FROM demands WHERE id = ?').run(id);
  
}

exports.login = function(email, password) {
  let result = db.prepare('SELECT id FROM users WHERE email = ? AND password = ?').get(email, password);
  if (result === undefined) return -1;
  return result.id;
}

exports.new_user = function(firstname,lastname,email, password) {
  let result = db.prepare('INSERT INTO users (firstname,lastname,email, password) VALUES (?,?,?, ?)').run(firstname,lastname,email, password);
  return result.lastInsertRowid;
}
/*exports.new_user = function(user, password) {
  let result = db.prepare('INSERT INTO user (name, password) VALUES (?, ?)').run(user, password);
  return result.lastInsertRowid;
}*/


