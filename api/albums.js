'use strict';

const AlbumsService = require('../core/services/albumsService');

const THROW = require('../utils/throwError');
const Types = require('../core/types/documentTypes');

module.exports = function(db, commentsSrv){
  const router = require('express').Router();

  router.get('/:id/by-band', findByBand);

  return router;

  function findByBand(req, res){
    let albumSrv = new AlbumsService(db);
    //return res.json({'res':'ok'});
    albumSrv.findByBand(req.params.id)
      .then(docs => {
        if(!docs) return res.send(404);

        return res.json(docs);
      })
      .catch(THROW(res));
  }
};
