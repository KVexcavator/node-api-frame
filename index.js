const express = require('express');
const app = express();
const articles = [{
  title: 'Example'
}];

app.set('port', process.env.PORT || 3000);

// gets all articles
app.get('/articles', (req, res, next) => {
  res.send(articles);
});
// creates an artocles
app.post('/articles', (req, res, next) => {
  res.send('OK');
});
// gets a single article
app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('Fetching:', id);
  res.send(articles[id]);
});
//delete an article
app.get('/articles', (req, res, next) => {
  const id = req.params.id;
  console.log('Delete:', id);
  delete articles[id];
  res.send({
    message: 'Deleted!'
  });
});

app.listen(app.get('port'), () => {
  console.log('App started on port:', app.get('port'));
});

module.exports = app;