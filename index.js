'use strict';
const PORT = 1338;

const cors = require('cors');
const Datastore = require('nedb');
const express = require('express');
const bodyParser = require('body-parser');

const api = require('./api');
const albumsApi = require('./api/albums')
const commentsSrv = require('./core/services/comments');

const db = new Datastore({
  filename: 'datastore/workshop.db',
  autoload: true
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/bands', api.bandsRoutes(db, new commentsSrv(db)));
app.use('/albums', api.albumsRoutes(db, new commentsSrv(db)));
app.use('/tracks', api.tracksRoutes(db, new commentsSrv(db)));
app.use('/artists', api.artistsRoutes(db, new commentsSrv(db)));
app.use('/comments', api.commentsRoutes(new commentsSrv(db)));

app.listen(PORT, () => console.log(`App started and listening on port ${PORT}`));
