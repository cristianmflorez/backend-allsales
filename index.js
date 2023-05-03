const express = require('express');
const path = require('path');
const routerApi = require('./routes');
const cookies = require('cookie-parser');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middleware/error.handler');
const { argv } = require('process');

const app = express();
  
// CORS headers on External
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://frontend-allsales.vercel.app')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Credentials', true, )
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
  next()
})

app.use(express.static('images'));
app.use(cookies());
const port = process.env.PORT || 3001;

app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler)

app.listen(port, () => {
    console.log('Mi port' +  port);
});

app.get('/', (req, res) => {
  res.send('API running')
})
