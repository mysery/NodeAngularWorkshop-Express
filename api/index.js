'use strict';
module.exports = {
  albumsRoutes(){
    const router = require('express').Router();

    router.get('/', findAll);

    router.get('/:id', find);

    router.get('/:id/comments', findComments);

    router.post('/:id', insertComment(data));

    return router;

    function findAll(req, res){
      // Complete this function
      res.json({ message: 'Your response goes here!' })
    }

    function find(req, res){
      // Complete this function
      res.json({ message: 'Your response goes here!' })
    }

    function findComments(req, res){
      // Complete this function
      res.json({ message: 'Your response goes here!' })
    }

    function insertComment(req, res){
      res.json({ message: 'Your response goes here!' })
    }
  }
};
