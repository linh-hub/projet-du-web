"use strict";


const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');
//Cette fonction renvoie null si l'identifiant n'existe pas.
 
exports.read = (id) => {
  let found = db.prepare('SELECT * FROM subject WHERE id = ?').get(id);
  if (found !== undefined) {
    found.ingredients = db.prepare('SELECT name FROM ingredient WHERE recipe = ? ORDER BY rank').all(id);
    found.stages = db.prepare('SELECT description FROM stage WHERE recipe = ? ORDER BY rank').all(id);
    return found;
  } else {
    return null;
  }
};
//Cette fonction retourne l'identifiant de la recette créée.

exports.create = function(recipe) {
  let id = db.prepare('INSERT INTO subject (id,title, summary, keyword) VALUES (@id, @title, @summary, @keyword)').run(subject).lastInsertRowid;

  let insert1 = db.prepare('INSERT INTO ingredient VALUES (@recipe, @rank, @name)');
  let insert2 = db.prepare('INSERT INTO stage VALUES (@recipe, @rank, @description)');

  let transaction = db.transaction((subject) => {
    for (let j = 0; j < subject.length; j++) {
      id.run({recipe: id, rank: j, name: recipe.ingredients[j].name});
    }
    for (let j = 0; j < recipe.stages.length; j++) {
      insert2.run({recipe: id, rank: j, description: recipe.stages[j].description});
    }
  });

  transaction(subject);
  return id;
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