const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

router.get("/", (req, res)=> {
   res.render('index', { projects });
    console.log("Welcome to my home page.")
});
router.get("/about", (req, res) => {
    res.render('about')
    console.log("Welcome to my about page.")
});
router.get('/projects/:id', (req, res, next) => {
const projectId = req.params.id;
const getProjects = projects.find( ({id}) => id === +projectId);
if (getProjects) {
    res.render("project", { projects: projects[req.params.id] });
} 
});

module.exports= router;


