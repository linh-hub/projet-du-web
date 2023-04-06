"use strict";

const fs = require('fs');
const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');

let entries = JSON.parse(fs.readFileSync('datastudent.json').toString());
let load = function(filename) {
  const teachers = JSON.parse(fs.readFileSync(filename));

  db.prepare('DROP TABLE IF EXISTS teacher').run();
  

  db.prepare('CREATE TABLE teacher (id INTEGER PRIMARY KEY AUTOINCREMENT, id INTERGER, firstname TEXT, lastname TEXT)').run();
  

  let insert = db.prepare('INSERT INTO teacher VALUES (@id, @firstname, @lastname)');
  

  let transaction = db.transaction((teachers) => {

    for (let id = 0;id < teachers.length; id++) {
      let teacher = teachers[id];
      teacher.id = id;
      insert.run(teacher);
      
    }
  });

  transaction(teachers);
}

load('datastudent.json');

db.prepare('DROP TABLE IF EXISTS user').run();
db.prepare('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT)').run();
db.prepare("INSERT INTO user (name, password) VALUES ('admin', 'miam')").run()