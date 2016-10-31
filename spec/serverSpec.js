var express = require('express');
var request = require('supertest');
var expect = require('chai').expect;
var app = require('../server/server.js');

var Jam = require('../server/jamdb');
var User = require('../server/userdb');

////////
// This test suite will cover our backend server functionality. The routes we test/currently support are:
// GET '/', '/login', '/signup', '/create', '/jams'
// POST '/login', '/signup', '/create', '/jams', '/logout'
///////

/////////////////////////////////////////////////////
// NOTE: these tests are designed for mongo!
/////////////////////////////////////////////////////

describe('login and signup api calls', function() {

  beforeEach(function(done) {
    // Delete objects from db so they can be created later for the test
    // User.remove({username: 'Savannah'}).exec();
    // User.remove({username: 'Phillip'}).exec();
    request(app)
      .get('/logout')
      .end(function(err, res) {
        // Delete objects from db so they can be created later for the test

        User.remove({username: 'Svnh'}).exec();
        User.remove({username: 'Phillip'}).exec();
        done();
      });

  });


  describe('Account Creation:', function() {

    it('Signup creates a new user', function(done) {
      request(app)
        .post('/api/users/signup')
        .send({
          'username': 'Svnh',
          'password': 'Svnh' })
        .expect(200)
        .expect(function() {
          User.findOne({'username': 'Svnh'})
            .exec(function(err, user) {
              expect(user.username).to.equal('Svnh');
            });
        })
        done();
    });
  }); // 'Account Creation'

  describe('Account Login:', function() {

    beforeEach(function(done) {
      var newUser = new User({
        'username': 'Phillip',
        'password': 'Phillip'
      });
      newUser.save(function() {
        done();
      });
    });

    it('Logs in existing users', function(done) {
      request(app)
        .post('/api/users/login')
        .send({
          'username': 'Phillip',
          'password': 'Phillip' })
        .expect(200)
        .end(done);
    });

    it('Users that do not exist should receive a 404 statusCode', function(done) {
      request(app)
        .post('/api/users/login')
        .send({
          'username': 'Fred',
          'password': 'Fred' })
        .expect(404)
        // .expect(function(res) {
        //   expect(res.headers.location).to.equal('/login');
        // })
        .end(done);
    });

  }); // Account Login

});

describe('creating and checking in to Jamz', function() {

  // beforeEach(function(done) {
  //   // Delete objects from db so they can be created later for the test
  //   // User.remove({username: 'Savannah'}).exec();
  //   // User.remove({username: 'Phillip'}).exec();
  //   request(app)
  //     .get('/logout')
  //     .end(function(err, res) {
  //       // Delete objects from db so they can be created later for the test

  //       User.remove({username: 'Svnh'}).exec();
  //       User.remove({username: 'Phillip'}).exec();
  //       done();
  //     });

  // });


  describe('Jam Creation:', function() {

    it('Create a new Jam', function(done) {
      request(app)
        .post('/api/jams/create')
        .send({
          'name': 'Testing Jam12312',
          'description': 'This is a testing jam' })
        .expect(200)
        .expect(function() {
          Jam.findOne({'name': 'Testing Jam12312'})
            .exec(function(err, jam) {
              expect(jam.public).to.equal(true);
              expect(jam.score).to.equal(0);
            });
        })
        done();
    });
  }); // 'Account Creation'

  describe('Jam checkin', function() {

    // beforeEach(function(done) {
      
    // });

    it('Checking in should increase the Jams score', function(done) {
      var newJam = new Jam({
        'name': 'checkingTesting',
        'description': 'this is a testing jam to checkin'
      });
      newJam.save(function() {
        request(app)
          .post('/api/users/jams/checkin')
          .send({'id': newJam.id})
          .expect(200)
          .expect(function() {
            Jam.findById(newJam.id)
              .exec(function (err, jam) {
                expect(jam.score).to.equal(1);
              });
          })
          done();
      });
    });

  }); // Account Login

});
