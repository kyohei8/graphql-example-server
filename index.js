const express = require('express');
const graphql = require('graphql');
const bodyParser = require('body-parser');
const schema = require('./schema.js');

const app  = express();
const PORT = 3000;

// parse POST body as text
app.use(bodyParser.text({ type: 'application/graphql' }));

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

