const express= require('express');
const app = express();
app.use('/static', express.static('public'));
app.set('view engine', 'pug');
const routes = require('./routes');
app.use(routes);
// const data= require('./data.json');
// Middleware

app.use(express.static('public'));

//Turns on server
app.listen(3000, () => {
    console.log("listening on port 3000")
});