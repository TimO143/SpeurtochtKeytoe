import React from 'react';

const request = require('supertest');
const express = require('express');

const app = express();

// Test om te zien of de connectie goed gemaakt wordt en het de gegevens op haalt
request('http://kwizz-server.keytoe.nl/getScoreBoard')
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
        if (err) throw err
        else return res;
    });

describe('GET /', function () {
    it('responds with json', function (done) {
        request('http://kwizz-server.keytoe.nl/getScoreBoard')
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});








