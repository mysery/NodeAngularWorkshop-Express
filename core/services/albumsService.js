'use strict';

const Promise = require('bluebird');

const Types = require('../types/documentTypes');
const ARTIST = Types.ARTIST;
const ALBUM = Types.ALBUM;
const BAND = Types.BAND;

class BandsService {
  constructor(db, AlbumsService){
    this.db = db;
    this.albumsService = AlbumsService;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.db.find({ docType: BAND }, (err, bands) => {
        if (err) return reject(err);

        let total = bands.length;
        let current = 0;
        if (0 === total) return resolve(null);
        let albumsList = [];
        bands.forEach((band, i) => {
          let totalAlbum = band.albums.length;
          let currentAlbum = 0;
          band.albums.forEach((albumId, i) => {
            let complexQuery = {
              $and: [
                {
                  docType: ALBUM
                }, {
                  _id: albumId
                }]};
            this.db.find(complexQuery, (err, album) => {
              if (err) return reject(err);

              albumsList[i] = album;
            });
          });
          if(total === ++current) {
            resolve(albumsList);
          }
        });
      });
    });
  }

  find(_id) {
    return new Promise((resolve, reject) => {
      this.db.findOne({docType: BAND, _id}, (err, band) => {
        if (err) return reject(err);

        let total = band.albums.length;
        let current = 0;
        if (0 === total) return resolve(null);
        let albumsList = [];
        band.albums.forEach((albumId, i) => {
          let complexQuery = {
            $and: [
              {
                docType: ALBUM
              }, {
                _id: albumId
              }]};
          this.db.find(complexQuery, (err, album) => {
            if (err) return reject(err);

            albumsList[i] = album;

            if(total === ++current) {
              resolve(albumsList);
            }
          });
        });
      });
    });
  }
}

module.exports = BandsService;
