/*
 * GET home page.
 */

exports.index = function (req, res){
  'use strict';

  var data = {
    title : 'Luiz Lopes - Web Application Developer',
    description: 'The website of Luiz Lopes, a web application developer, and athlete; living in Seattle, Washington'
  };

  res.render('index', data);
};
