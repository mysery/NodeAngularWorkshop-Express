'use strict';

var test = require('tape');
var request = require('supertest');
var app = require('../api');

test('findAll', function (t) {
  request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      var expected = { message: 'Your response goes here!' };

      t.error(err, 'No error');
      t.same(res.body, expected, 'As expected');
      t.end();
    });
})
