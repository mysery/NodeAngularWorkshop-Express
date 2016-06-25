'use strict';

const Promise = require('bluebird');

const Types = require('../types/documentTypes');
const COMMENT = Types.COMMENT;
const TRACK = Types.TRACK;

class CommentsService {
  constructor(db){
    this.db = db;
  }

  findByTrack(track_id){
    return new Promise((resolve, reject) => {
      this.db.find({ docType: COMMENT, parentKey: track_id}, (err, comments) => {
        if (err) return reject(err);

        if (0 === tracks.length) return resolve([]);
        resolve(comments);
      });
    });
  }

  insert(parentKey, message){

  }
}

module.exports = CommentsService;
