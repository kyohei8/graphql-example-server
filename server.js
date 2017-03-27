const express = require('express');
const graphql = require('graphql');
const bodyParser = require('body-parser');
const compression = require('compression');
const schema = require('./app/schema.js');
const app  = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.use(express.static('assets'));
app.use(compression());

// parse POST body as text
app.use(bodyParser.text({ type: 'application/graphql' }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/graphql', (req, res) => {
  // execute GraphQL!
  graphql.graphql(schema, req.body).then((result) => {
    res.send(JSON.stringify(result, null, 2));
  });
});

const server = app.listen(PORT, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});

