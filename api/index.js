'use strict';
const AlbumsService = require('../core/services/albumsService');
const BandsService = require('../core/services/bandsService');
const TrackService = require('../core/services/trackService');
const ArtistService = require('../core/services/artistService');
const CommentsRoute = require('./comments');

const THROW = require('../utils/throwError');
const Types = require('../core/types/documentTypes');

function generateAPI(finderSrv, commentsSrv){
  const router = require('express').Router();

  router.get('/', findAll);

  router.get('/:id', find);

  router.get('/:id/comments', findComments);

  return router;

  function findAll(req, res){
    finderSrv.findAll()
      .then(docs => {
        if(!docs) return res.send(404);

        return res.json(docs);
      })
      .catch(THROW(res));
  }
  function find(req, res){
    finderSrv.find(req.params.id)
      .then(band => {
        if(!band) return res.send(404);
        return res.json(band);
      })
      .catch(THROW(res));
  }

  function findComments(req, res){
    commentsSrv.findByTrack(req.params.id)
      .then(docs => {
        if(!docs) return res.send(404);
        return res.json(docs);
        })
        .catch(THROW(res));
  }
}


module.exports = {
  albumsRoutes(db, commentsSrv){
    return generateAPI(new AlbumsService(db), commentsSrv);
  },

  bandsRoutes(db, commentsSrv){
    return generateAPI(new BandsService(db, new AlbumsService(db)), commentsSrv);
  },

  tracksRoutes(db, commentsSrv){
    return generateAPI(new TrackService(db), commentsSrv);
  },

  artistsRoutes(db, commentsSrv){
    return generateAPI(new ArtistService(db), commentsSrv);
  },

  commentsRoutes(commentsSrv){
     return CommentsRoute(commentsSrv);
  }
};
