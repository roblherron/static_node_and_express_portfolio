const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');
//root route handler
router.get("/", (req, res)=> {
   res.render('index', { projects });
    console.log("Welcome to my home page.")
});
//about page route handler
router.get("/about", (req, res) => {
    res.render('about')
    console.log("Welcome to my about page.")
});
//projects route handler
router.get('/projects/:id', (req, res, next) => {
const projectId = req.params.id;
const getProjects = projects.find( ({id}) => id === +projectId);
if (getProjects) {
    res.render("project", { projects: projects[req.params.id] });
} else{
    const err = new Error();
    err.status = 404;
    err.message = `The project that you requested doesn't exist!`
    next(err);}
});

module.exports= router;


