'use strict';
module.exports = function(commentsSrv){
  const router = require('express').Router();

  router.post('/', insert);

  return router;

  function insert(req, res){
    console.log("Inserting comment");
    console.log(JSON.stringify(req.body));
    commentsSrv.insert(req.body.parentKey, req.body.message)
      .then(comment => res.json(comment));
  }

  function find(req, res){
    console.log("find comment by track");
    commentsSrv.findByTrack(req.body.parentId)
      .then(comment => res.json(comment));
  }
};
