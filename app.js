
const sslRedirect = require('heroku-ssl-redirect').default;
const express = require('express');
const app = express();
app.use(sslRedirect());
// favicon = require('serve-favicon');
// app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

const port = process.env.PORT || 3000;
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