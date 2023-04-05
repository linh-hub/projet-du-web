"use strict";


const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');



db.prepare('DROP TABLE IF EXISTS subjects').run();
db.prepare('CREATE TABLE subject ' +
           '(id INTEGER PRIMARY KEY AUTOINCREMENT,' +
           ' title TEXT, summary TEXT)').run();

exports.load = function(filename) {
  const subject = JSON.parse(fs.readFileSync(filename));
  let insert = db.prepare('INSERT INTO subjects VALUES ' +
                          '(@id, @title, @summary,');
  let clear_and_insert_many = db.transaction((subjects) => {
    db.prepare('DELETE FROM subjects');
    for (let id of Object.keys(subjects)) {
      insert.run(subjects[id]);
    }
  });
  clear_and_insert_many(subjects);
  return true;
};


exports.save = function(filename) {
  let subject_list = db.prepare('SELECT * FROM subjects ORDER BY id').all();
  let subject = {};
  for (let subject of subject_list) {
    subjects[subject.id] = subject;
  }
  fs.writeFileSync(filename, JSON.stringify(subjects));
};
 

exports.read = function(id) {
  let result = db.prepare('SELECT * FROM subjects WHERE id = ?').get(id);
  if(result === undefined) return null;
  return result;
};

exports.create = function(id, title, summary) {
  let movie = {
    id: id,
    title: title,
    summary: summary,
    
  };
  let result = db.prepare('INSERT INTO subject ' +
                          '(id,title, summary) ' +
                          'VALUES (@id,@title, @summary)').run(subject);
  return result.lastInsertRowid;
};
exports.list = function() {
  let movie_list = db.prepare('SELECT * FROM subject ORDER BY id').all();
  return subject_list;
}

exports.login = function(user, password) {
    let result = db.prepare('SELECT id FROM user WHERE name = ? AND password = ?').get(user, password);
    if (result === undefined) return -1;
    return result.id;
  }
  
  exports.new_user = function(user, password) {
    let result = db.prepare('INSERT INTO user (name, password) VALUES (?, ?)').run(user, password);
    return result.lastInsertRowid;
  }