'use strict';
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    let templateData = {
        title : 'Luiz Lopes - Web Application Developer',
        description: 'The website of Luiz Lopes, a web application developer, and athlete; living in Seattle, Washington'
    };
    res.render('index', templateData);
});

module.exports = router;
