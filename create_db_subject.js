"use strict";

const fs = require('fs');
const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');

let entries = JSON.parse(fs.readFileSync('datastudent.json').toString());
let load = function(filename) {
  const subjects = JSON.parse(fs.readFileSync(filename));

  db.prepare('DROP TABLE IF EXISTS subject').run();
  

  db.prepare('CREATE TABLE subject (id INTEGER PRIMARY KEY AUTOINCREMENT, id INTERGER,  title TEXT, summary TEXT,keyword TEXT)').run();
  

  let insert = db.prepare('INSERT INTO recipe VALUES (@id, @title, @summary, @keyword)');
  

  let transaction = db.transaction((subjects) => {

    for (let id = 0;id < subjects.length; id++) {
      let subject = subjects[id];
      subject.id = id;
      insert.run(subject);
      
    }
  });

  transaction(subjects);
}

load('datasubject.json');

db.prepare('DROP TABLE IF EXISTS user').run();
db.prepare('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT)').run();
db.prepare("INSERT INTO user (name, password) VALUES ('admin', 'miam')").run()