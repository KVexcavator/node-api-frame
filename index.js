const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Article = require('./db').Article;

app.set('port', process.env.PORT || 3000);

//support request bodies encoded as JSON
app.use(bodyParser.json());
//support form-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// gets all articles
app.get('/articles', (req, res, next) => {
  Article.all((err, articles) => {
    if (err) return next(err);
    res.send(articles);
  });
});
// creates an artocles
app.post('/articles', (req, res, next) => {
  const article = {
    title: req.body.title
  };
  articles.push(article);
  res.send(article);
});
// find a specific article
app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  Article.find(id, (err, article) => {
    if (err) return next(err);
    res.send(articles[id]);
  });
});
//delete an article
app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  Article.delete(id, (err) => {
    if (err) return next(err);
    res.send({
      message: 'Delete'
    });
  });
});

app.listen(app.get('port'), () => {
  console.log('App started on port:', app.get('port'));
});

module.exports = app;