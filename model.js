"use strict";


const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');


exports.read_demand_student = (id) => {
  let found = db.prepare('SELECT * FROM user WHERE id = ?').get(id);
  if (found !== undefined) {
    found.demand = db.prepare('SELECT * FROM demand WHERE sendid = ? ').all(id);
    return found;
  } else {
    return null;
  }
};
exports.read_demand_teacher = (id) => {
    let found = db.prepare('SELECT * FROM user WHERE id = ?').get(id);
    if (found !== undefined) {
      found.demand = db.prepare('SELECT * FROM demand WHERE receiveid = ? ').all(id);
      return found;
    } else {
      return null;
    }
  };


exports.create_demand = function(sendid, receiveid, title,content) {
    let found = db.prepare('SELECT * FROM user WHERE id = sendid').get(id);
    if (found !== undefined) {
        let id = db.prepare('INSERT INTO demand (sendid, receiveid,title, content) VALUES (@sendid,@receiveid,@title, @content)').run(demand).lastInsertRowid;
    }
    else{
        return null;
    }

  
  

}
exports.update_status = function(id){
    let found = db.prepare('SELECT * FROM demand WHERE id = receiveid').get(id);
    if (found !== undefined) {
        let id = db.prepare('INSERT INTO demand (sendid, receiveid,title, content) VALUES (@sendid,@receiveid,@title, @content)').run(demand).lastInsertRowid;
    }
    else{
        return null;
    }
    
}
exports.send_noti


exports.update_demand = function(sendid,receiveid,title,content) {
    
  let result = db.prepare('UPDATE demand SET sendid = @sendid,receiveid = @receiveid,title = @title, content = @content WHERE id = ?').run(id);
  
}

/* Fonction pour effacer une recette dans la base à partir de son identifiant */
exports.delete = function(id) {
  db.prepare('DELETE FROM recipe WHERE id = ?').run(id);
  db.prepare('DELETE FROM ingredient WHERE recipe = ?').run(id);
  db.prepare('DELETE FROM stage WHERE recipe = ?').run(id);
}

/* Recherche d'une recette par requête, avec pagination des résultats

Cette fonction prend en argument la requête sous forme d'une chaîne de caractères
et le numéro de la page de résultats.

Cette fonction retourne un dictionnaire contenant les champs suivants :
- results: liste de recettes (version courte contenant l'identifiant de la recette, son titre et l'url de son image)
- num_found: le nombre de recettes trouvées
- query: la requête
- next_page: numero de la page suivante
- page: numero de la page courante
- num_pages: nombre total de pages
*/
exports.search = (query, page) => {
  const num_per_page = 32;
  query = query || "";
  page = parseInt(page || 1);

  // on utiliser l'opérateur LIKE pour rechercher dans le titre 
  let num_found = db.prepare('SELECT count(*) FROM recipe WHERE title LIKE ?').get('%' + query + '%')['count(*)'];
  let results = db.prepare('SELECT id as entry, title, img FROM recipe WHERE title LIKE ? ORDER BY id LIMIT ? OFFSET ?').all('%' + query + '%', num_per_page, (page - 1) * num_per_page);

  return {
    results: results,
    num_found: num_found, 
    query: query,
    next_page: page + 1,
    page: page,
    num_pages: parseInt(num_found / num_per_page) + 1,
  };
};


exports.login = function(user, password) {
  let result = db.prepare('SELECT id FROM user WHERE name = ? AND password = ?').get(user, password);
  if (result === undefined) return -1;
  return result.id;
}

exports.create_user = function(user, password) {
  let result = db.prepare('INSERT INTO user (name, password) VALUES (?, ?)').run(user, password);
  return result.lastInsertRowid;
}


