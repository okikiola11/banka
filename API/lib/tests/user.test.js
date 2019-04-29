"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _supertest = _interopRequireDefault(require("supertest"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai.default.expect;
var API_PREFIX = '/api/v1';
describe('Test case for the default for the banka route /', function () {
  describe('/ testing for response', function () {
    it('should return a welcome message to the user', function (done) {
      (0, _supertest.default)(_index.default).get('/').expect(200).expect(function (response) {
        expect(response.text).to.be.a('string').to.equal('Welcome, to the Web Banking Application!');
      }).end(done);
    });
  });
  describe('/ testing for endpoints that do not exist', function () {
    it('should return 404 error', function (done) {
      (0, _supertest.default)(_index.default).get('/google').expect(404).expect(function (response) {
        expect(response.body).to.be.an('object').to.eql({
          status: 404,
          message: 'The endpoint you have requested does not exist on this server'
        }).to.have.all.keys('status', 'message');
      }).end(done);
    });
  });
});
describe('/ User Auth Signup Endpoint ', function () {
  describe('/ user signup - User SignUp Validation Test(Required)', function () {
    it('user signup validation check', function (done) {
      (0, _supertest.default)(_index.default).post("".concat(API_PREFIX, "/auth/signup")).set('Accept', 'application/json').send({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }).expect(400).expect(function (response) {
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.equal('Validation failed, check errors property for more details');
        expect(response.body).to.have.all.keys('status', 'error', 'errors');
      }).end(done);
    });
    it('should allow a user to signup ', function (done) {
      (0, _supertest.default)(_index.default).post("".concat(API_PREFIX, "/auth/signup")).set('Accept', 'application/json').send({
        firstName: 'Okikiola',
        lastName: 'Apelehin',
        email: 'user@gmail.com',
        password: 'okiki123'
      }).expect(201).expect(function (response) {
        expect(response.body.status).to.equal(201);
        expect(response.body.message).to.equal('New User has been created');
        expect(response.body.data[0]).to.have.all.keys('id', 'token', 'firstName', 'lastName', 'email');
      }).end(done);
    });
  });
});
describe('/ User Auth Login Endpoint ', function () {
  describe('/ POST user login ', function () {
    it('user login validation check', function (done) {
      (0, _supertest.default)(_index.default).post("".concat(API_PREFIX, "/auth/signin")).set('Accept', 'application/json').send({
        email: '',
        password: ''
      }).expect(400).expect(function (response) {
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.equal('Validation failed, check errors property for more details');
      }).end(done);
    });
    it('POST /auth/signin - User Can\'t login with incorrect password', function (done) {
      (0, _supertest.default)(_index.default).post("".concat(API_PREFIX, "/auth/signin")).send({
        email: 'user@gmail.com',
        password: 'okiki111'
      }).expect(403).expect(function (response) {
        expect(response.body.status).to.equal(403);
        expect(response.body.message).to.equal('Incorrect Password');
      }).end(done);
    });
    it('should allow a user to login after signing up ', function (done) {
      (0, _supertest.default)(_index.default).post("".concat(API_PREFIX, "/auth/signin")).set('Accept', 'application/json').send({
        email: 'john.doe@gmail.com',
        password: 'johnny'
      }).expect(200).expect(function (response) {
        expect(response.body.status).to.equal(200);
        expect(response.body.message).to.equal('Welcome john.doe@gmail.com, you have successfully logged in');
        expect(response.body.data).to.have.all.keys('id', 'token', 'firstName', 'lastName', 'email');
      }).end(done);
    });
  });
});