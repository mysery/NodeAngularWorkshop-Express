'use strict';

const Promise = require('bluebird');

const Types = require('../types/documentTypes');
const COMMENT = Types.COMMENT;

class CommentsService {
  constructor(db){
    this.db = db;
  }

  findByTrack(track_id){
    return new Promise((resolve, reject) => {
      this.db.find({ docType: COMMENT, parentKey: track_id}, (err, comments) => {
        if (err) return reject(err);

        if (0 === comments.length) return resolve(null);
        resolve(comments);
      });
    });
  }

  insert(_parentKey, _message){
    return new Promise((resolve, reject) => {
      console.log("_parentKey:" + _parentKey);
      console.log("_message:" + _message);
      var doc = {docType: COMMENT,
                      parentKey: _parentKey,
                      message: _message,
                      ts: new Date()};
      this.db.insert(doc, (err, comment) => {
        if (err) return reject(err);

        return resolve(comment);
      });
    });
  }
}

module.exports = CommentsService;
