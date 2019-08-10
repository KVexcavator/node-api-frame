const sqlite3 = require('sqlite3').verbose();
const dbName = 'node-api-frame.sqlite';
const db = new sqlite3.Database(dbName);

// create an "articles" table if there isn't one
db.serialize(() => {
  const sql = `CREATE TABLE IF NOT EXISTS articles
   (id integer primary key, title, content TEXT)`;
  db.run(sql);
});

class Article {
  // all articles
  static all(cb) {
    db.all('SELECT*FROM articles', cb);
  }
  // select a specific artocle
  static find(id, cb) {
    db.get('SELECT*FROM articles WHERE id = ?', id, cb);
  }
  //specifies parameters with question marks
  static create(data, cb) {
    const sql = 'INSERT INTO articles(title,content) VALUES (?,?)';
    db.run(sql, data.title, data.content, cb);
  }
  // delete article
  static delete(id, cb) {
    if (!id) return cb(new Error('Please provide an id'));
    db.run('DELETE FROM articles WHERE id = ?', id, cb);
  }
}

module.exports = db;
module.exports.Article = Article;