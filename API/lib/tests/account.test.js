"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chai = _interopRequireDefault(require("chai"));

var _supertest = _interopRequireDefault(require("supertest"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = require("dotenv");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();
var expect = _chai.default.expect;
var API_PREFIX = '/api/v1';

var token = _jsonwebtoken.default.sign({
  id: 4,
  type: 'client',
  isAdmin: false
}, process.env.SECRET, {
  expiresIn: 86400 // expires cmdin 24hours

});

var staffToken = _jsonwebtoken.default.sign({
  id: 1,
  type: 'staff',
  isAdmin: false
}, process.env.SECRET, {
  expiresIn: 86400 // expires cmdin 24hours

});

describe('/ Account Endpoint ', function () {
  describe('/ POST accounts - Account Setup (Required)', function () {
    it('should be able to create a bank account', function (done) {
      (0, _supertest.default)(_index.default).post("".concat(API_PREFIX, "/accounts/")).set('Accept', 'application/json').set('Authorization', "".concat(token)).send({
        type: 'current',
        openingBalance: '25000.00'
      }).expect(201).expect(function (response) {
        expect(response.body).to.have.all.keys('status', 'message', 'data');
        expect(response.body.status).to.equal(201);
        expect(response.body.message).to.equal('Account has been created');
        expect(response.body.data).to.have.all.keys('accountNumber', 'firstName', 'lastName', 'email', 'type', 'openingBalance');
      }).end(done);
    });
    it('should create user accounts validation check', function (done) {
      (0, _supertest.default)(_index.default).post("".concat(API_PREFIX, "/accounts")).set('Accept', 'application/json').set('Authorization', "".concat(token)).send({
        type: '',
        openingBalance: '25000.00'
      }).expect(400).expect(function (response) {
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.equal('Validation failed, check errors property for more details');
      }).end(done);
    });
  });
  describe('/ GET all accounts ', function () {
    it('should get all dormant accounts ', function (done) {
      (0, _supertest.default)(_index.default).get("".concat(API_PREFIX, "/accounts?status=dormant")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).expect(200).expect(function (response) {
        expect(response.body).to.have.all.keys('status', 'message', 'data');
        expect(response.body.status).to.equal(200);
        expect(response.body.message).to.equal('Successfully retrieved all dormant accounts');
        expect(response.body.data[0]).to.have.all.keys('id', 'ownerid', 'accountnumber', 'type', 'status', 'balance', 'createdon', 'updatedon');
      }).end(done);
    });
    it('should return only all dormant accounts owned by the client in the event that a client makes a request with this route', function (done) {
      (0, _supertest.default)(_index.default).get("".concat(API_PREFIX, "/accounts?status=dormant")).set('Accept', 'application/json').set('Authorization', "".concat(token)).expect(200).expect(function (response) {
        expect(response.body).to.have.all.keys('status', 'message', 'data');
        expect(response.body.status).to.equal(200);
        expect(response.body.message).to.equal('Successfully retrieved all dormant accounts');
        expect(response.body.data[0]).to.have.all.keys('id', 'ownerid', 'accountnumber', 'type', 'status', 'balance', 'createdon', 'updatedon');
        expect(response.body.data[0].ownerid).to.equal(4);
      }).end(done);
    });
    it('should return only all active accounts owned by the client in the event that a client makes a request with this route', function (done) {
      (0, _supertest.default)(_index.default).get("".concat(API_PREFIX, "/accounts?status=active")).set('Accept', 'application/json').set('Authorization', "".concat(token)).expect(200).expect(function (response) {
        expect(response.body).to.have.all.keys('status', 'message', 'data');
        expect(response.body.status).to.equal(200);
        expect(response.body.message).to.equal('Successfully retrieved all active accounts');
        expect(response.body.data[0]).to.have.all.keys('id', 'ownerid', 'accountnumber', 'type', 'status', 'balance', 'createdon', 'updatedon');
        expect(response.body.data[0].ownerid).to.equal(4);
      }).end(done);
    });
    it('should get all active accounts ', function (done) {
      (0, _supertest.default)(_index.default).get("".concat(API_PREFIX, "/accounts?status=active")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).expect(200).expect(function (response) {
        expect(response.body).to.have.all.keys('status', 'message', 'data');
        expect(response.body.status).to.equal(200);
        expect(response.body.message).to.equal('Successfully retrieved all active accounts');
        expect(response.body.data[0]).to.have.all.keys('id', 'ownerid', 'accountnumber', 'type', 'status', 'balance', 'createdon', 'updatedon');
      }).end(done);
    });
    it('should get all draft accounts ', function (done) {
      (0, _supertest.default)(_index.default).get("".concat(API_PREFIX, "/accounts?status=draft")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).expect(200).expect(function (response) {
        expect(response.body).to.have.all.keys('status', 'message', 'data');
        expect(response.body.status).to.equal(200);
        expect(response.body.message).to.equal('Successfully retrieved all draft accounts');
        expect(response.body.data[0]).to.have.all.keys('id', 'ownerid', 'accountnumber', 'type', 'status', 'balance', 'createdon', 'updatedon');
      }).end(done);
    });
    it('should get all account ', function (done) {
      (0, _supertest.default)(_index.default).get("".concat(API_PREFIX, "/accounts")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).expect(200).expect(function (response) {
        expect(response.body).to.have.all.keys('status', 'message', 'data');
        expect(response.body.status).to.equal(200);
        expect(response.body.message).to.equal('Successfully retrieved all accounts');
        expect(response.body.data[0]).to.have.all.keys('id', 'ownerid', 'accountnumber', 'type', 'status', 'balance', 'createdon', 'updatedon');
      }).end(done);
    });
  });
  describe('/ GET a single user accounts ', function () {
    it('should get a single account ', function (done) {
      (0, _supertest.default)(_index.default).get("".concat(API_PREFIX, "/accounts/2050030485")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).expect(200).expect(function (response) {
        expect(response.body).to.have.all.keys('status', 'message', 'data');
        expect(response.body.status).to.equal(200);
        expect(response.body.message).to.equal('Account has been successfully retrieved');
        expect(response.body.data[0]).to.have.all.keys('id', 'ownerid', 'accountnumber', 'type', 'status', 'balance', 'createdon', 'updatedon');
      }).end(done);
    });
    it('should get an error message if the account number does not exist ', function (done) {
      (0, _supertest.default)(_index.default).get("".concat(API_PREFIX, "/accounts/2040050222")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).expect(404).expect(function (response) {
        expect(response.body).to.eql({
          status: 404,
          message: 'Account does not exist'
        }).to.have.all.keys('status', 'message');
      }).end(done);
    });
  });
});
describe('/ UPDATE account ', function () {
  it('should send an error message if account is not found ', function (done) {
    (0, _supertest.default)(_index.default).patch("".concat(API_PREFIX, "/accounts/2040050222")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).send({
      status: 'active'
    }).expect(404).expect(function (response) {
      expect(response.body).to.eql({
        status: 404,
        error: 'Account Number not found'
      }).to.have.all.keys('status', 'error');
    }).end(done);
  });
  it('should activate or deactivate account ', function (done) {
    (0, _supertest.default)(_index.default).patch("".concat(API_PREFIX, "/accounts/2050030485")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).send({
      status: 'active'
    }).expect(200).expect(function (response) {
      expect(response.body).to.have.all.keys('status', 'message', 'data');
      expect(response.body.status).to.equal(200);
      expect(response.body.message).to.equal('Account has been succesfully updated');
      expect(response.body.data[0]).to.have.all.keys('accountNumber', 'status');
    }).end(done);
  });
  it('should send an error message if Validation fails ', function (done) {
    (0, _supertest.default)(_index.default).patch("".concat(API_PREFIX, "/accounts/2040050222")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).expect(400).expect(function (response) {
      expect(response.body.status).to.equal(400);
      expect(response.body.error).to.equal('Validation failed, check errors property for more details');
    }).end(done);
  });
});
describe('/ DELETE account ', function () {
  it('should return an error message if user record was not found ', function (done) {
    (0, _supertest.default)(_index.default).delete("".concat(API_PREFIX, "/accounts/2040050222")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).expect(404).expect(function (response) {
      expect(response.body).to.eql({
        status: 404,
        error: 'Oooops! no record with such Account number'
      }).to.have.all.keys('status', 'error');
    }).end(done);
  });
  it('should delete a user account ', function (done) {
    (0, _supertest.default)(_index.default).delete("".concat(API_PREFIX, "/accounts/2050030485")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).expect(200).expect(function (response) {
      expect(response.body).to.have.all.keys('status', 'message');
      expect(response.body.status).to.equal(200);
      expect(response.body.message).to.equal('Account has been deleted successfully');
    }).end(done);
  });
});
var _default = token;
exports.default = _default;