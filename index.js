const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Article = require('./db').Article;
/*provides an asynchronous function that downloads a URL
 and turns the HTML into a simplified representation*/
const read = require('node-readability');

app.set('port', process.env.PORT || 3000);

//support request bodies encoded as JSON
app.use(bodyParser.json());
//support form-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));
//load Bootstrap
app.use(
  '/css/bootstrap.css',
  express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);

// gets all articles
app.get('/articles', (req, res, next) => {
  Article.all((err, articles) => {
    if (err) return next(err);
    res.format({
      html: () => {
        res.render('articles.ejs', {
          articles: articles
        });
      },
      json: () => {
        res.send(articles);
      }
    });
  });
});
// creates an artocles
app.post('/articles', (req, res, next) => {
  //gets the URL from the POST body
  const url = req.body.url;
  // uses the readability mode to fetch the URL
  read(url, (err, result) => {
    if (err || !result) res.status(500).send('Error downloading aeticle');
    Article.create({
        title: result.title,
        content: result.content
      },
      (err, article) => {
        if (err) return next(err);
        // arter saving the article, sends back a 200
        res.send('OK');
      }
    );
  });
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