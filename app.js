// const fs = require('fs');
// const cert = fs.readFileSync('./SSL/server.crt'); 
// const caBundle = fs.readFileSync('./SSL/server.ca-bundle', {encoding:'utf8'});
// const key = fs.readFileSync('./SSL/server.key');
// const https= require('https');

// const httpsOptions = {
//     cert: fs.readFileSync('./SSL/server.crt'),
//     ca: fs.readFileSync('./SSL/server.ca-bundle', {encoding:'utf8'}),
//     key: fs.readFileSync('./SSL/server.key')
// };
// console.log(cert);
// console.log(caBundle);
// console.log(key);
// const httpsServer = https.createServer(httpsOptions, (req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     res.end(`<h1>Hello from the HTTPS server </h1>`);
// });
// httpsServer.listen(port, hostname);

const port = process.env.PORT || 3000;
const express= require('express');
const app = express();
app.use('/static', express.static('public'));
app.set('view engine', 'pug');
const routes = require('./routes');
app.use(routes);

//error handlers

//404
app.use((req, res, next) => {
    const err = new Error("Sorry, the page you're looking for doesn't exist.");
    err.status = 404;
    console.log(err.status);
    console.log(err.stack);
    next(err);
    // console.log('404 handler called')
    
});
//global err handler
app.use((err, req, res, next) => {
if (err.status === 404) {
    res.render('not-found');
} else {
    err.status = 500;
    res.render('global-error');
    next(err);
}
})
//Turns on server
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});