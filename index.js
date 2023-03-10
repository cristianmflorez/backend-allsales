const express = require('express');
const path = require('path');
const routerApi = require('./routes');
const cookies = require('cookie-parser');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middleware/error.handler');

const app = express();

// CORS headers on Host
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://192.0.2.2')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Credentials', true, )
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    next()
  })
  
  // CORS headers on External
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Credentials', true, )
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    next()
  })

app.use(express.static(path.resolve(__dirname, './images')));
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