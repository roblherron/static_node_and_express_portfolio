const express = require('express');
const router = express.Router();
const { projects } = require('../data/data.json');

router.get("/", (req, res)=> {
   res.render('index', { projects });
    console.log("I hope this is working.")
});
router.get("/about", (req, res) => {
    console.log("I hope this is working.")
});
router.get('projects/:id', (req, res, next) => {
const projectId = req.params.id;
const projects = projects.find( ({id}) => id === +projectId);
if (projects) {
    res.render("projects", { projects });
} 
});

module.exports= router;


