"use strict";

const fs = require('fs');
const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');

let entries = JSON.parse(fs.readFileSync('data.json').toString());
let load = function(filename) {
  const recipes = JSON.parse(fs.readFileSync(filename));

  db.prepare('DROP TABLE IF EXISTS users').run();
  db.prepare('DROP TABLE IF EXISTS roles').run();
  db.prepare('DROP TABLE IF EXISTS demands').run();

  db.prepare('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, email TEXT, role INT)').run();
  db.prepare('CREATE TABLE roles (value INT, role TEXT)').run();
  db.prepare('CREATE TABLE demands (id INT, studentid INT,  teacherid INT,title TEXT, content TEXT, status BOOL)').run();

  let insert1 = db.prepare('INSERT INTO users VALUES (@id, @firstname, @lastname, @email, @role)');
  let insert2 = db.prepare('INSERT INTO roles VALUES (@value, @role)');
  let insert3 = db.prepare('INSERT INTO demands VALUES (@id, @studentid, @teacherid,@title,@content,@status)');
// not sure abt this function
  let transaction = db.transaction((users) => {

    for (let id = 0;id < users.length; id++) {
      let user = users[id];
      recipe.id = id;
      insert1.run(recipe);
      for (let j = 0; j < recipe.ingredients.length; j++) {
        insert2.run({recipe: id, rank: j, name: recipe.ingredients[j].name});
      }
      for (let j = 0; j < recipe.stages.length; j++) {
        insert3.run({recipe: id, rank: j, description: recipe.stages[j].description});
      }
    }
  });

  transaction(recipes);
}

load('data.json');

db.prepare('DROP TABLE IF EXISTS user').run();
db.prepare('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT)').run();
db.prepare("INSERT INTO user (name, password) VALUES ('admin', 'miam')").run();
