const fs = require('fs');
const cert = fs.readFileSync('C:\Users\Linebreakyourface\AppData\Local\Temp\Temp1_www_roblherron_com.zip\www_roblherron_com.ca-bundle');
const ca = fs.readFileSync('C:\Users\Linebreakyourface\AppData\Local\Temp\Temp1_www_roblherron_com.zip\www_roblherron_com.crt');
const key = fs.readFileSync('C:\Users\Linebreakyourface\server.key');
const https= require('https');
const port = process.env.PORT || 3000;
const httpsOptions = {
    cert: fs.readFileSync('C:\Users\Linebreakyourface\AppData\Local\Temp\Temp1_www_roblherron_com.zip\www_roblherron_com.ca-bundle'),
    ca: fs.readFileSync('C:\Users\Linebreakyourface\AppData\Local\Temp\Temp1_www_roblherron_com.zip\www_roblherron_com.crt'),
    key: fs.readFileSync('C:\Users\Linebreakyourface\server.key')
};
const httpsServer = https.createServer(httpsOptions, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<h1>Hello from the HTTPS server </h1>`);
});
httpsServer.listen(port, hostname);


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