"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _supertest = _interopRequireDefault(require("supertest"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai.default.expect;
var API_PREFIX = '/api/v1';

var token = _jsonwebtoken.default.sign({
  id: 1,
  userType: {
    user: true,
    admin: false,
    staff: false
  }
}, _config.default.secret, {
  expiresIn: 86400 // expires cmdin 24hours

});

var staffToken = _jsonwebtoken.default.sign({
  id: 1,
  userType: {
    user: false,
    admin: true,
    staff: true
  }
}, _config.default.secret, {
  expiresIn: 86400 // expires cmdin 24hours

});

describe('/ User Account Auth Endpoint ', function () {
  describe('/ POST accounts - Account Setup (Required)', function () {
    it('should allow only user account option ', function (done) {
      (0, _supertest.default)(_index.default).post("".concat(API_PREFIX, "/accounts/")).set('Accept', 'application/json').set('Authorization', "".concat(token)).send({
        type: 'current',
        openingBalance: '25000.00'
      }).expect(201).expect(function (response) {
        expect(response.body).to.have.all.keys('status', 'message', 'data');
        expect(response.body.status).to.equal(201);
        expect(response.body.message).to.equal('Account has been created');
        expect(response.body.data[0]).to.have.all.keys('id', 'ownerId', 'accountNumber', 'type', 'openingBalance', 'acctStatus', 'accountBalance', 'createdOn');
      }).end(done);
    });
    it('should create user accounts validation check', function (done) {
      (0, _supertest.default)(_index.default).post("".concat(API_PREFIX, "/accounts")).set('Accept', 'application/json').set('Authorization', "".concat(token)).send({
        type: '',
        openingBalance: '25000.00'
      }).expect(401).expect(function (response) {
        expect(response.body.status).to.equal(401);
        expect(response.body.error).to.equal('Validation failed, check errors property for more details');
      }).end(done);
    });
  });
  describe('/ GET all accounts ', function () {
    it('should get all account ', function (done) {
      (0, _supertest.default)(_index.default).get("".concat(API_PREFIX, "/accounts")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).expect(200).expect(function (response) {
        expect(response.body).to.have.all.keys('status', 'message', 'data');
        expect(response.body.status).to.equal(200);
        expect(response.body.message).to.equal('Successfully retrieved all accounts');
        expect(response.body.data[0]).to.have.all.keys('id', 'ownerId', 'accountNumber', 'type', 'openingBalance', 'acctStatus', 'accountBalance', 'createdOn');
      }).end(done);
    });
  });
  describe('/ GET a single user accounts ', function () {
    it('should get a single account ', function (done) {
      (0, _supertest.default)(_index.default).get("".concat(API_PREFIX, "/accounts/2040050234")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).expect(200).expect(function (response) {
        expect(response.body).to.have.all.keys('status', 'message', 'data');
        expect(response.body.status).to.equal(200);
        expect(response.body.message).to.equal('Account has been successfully retrieved');
        expect(response.body.data[0]).to.have.all.keys('id', 'ownerId', 'accountNumber', 'type', 'openingBalance', 'acctStatus', 'accountBalance', 'createdOn');
      });
      (0, _supertest.default)(_index.default).get("".concat(API_PREFIX, "/accounts/2040050222")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).expect(404).expect(function (response) {
        expect(response.body).to.eql({
          status: 404,
          error: 'Account does not exist'
        }).to.have.all.keys('status', 'error');
      }).end(done);
    });
  });
  describe('/ UPDATE account ', function () {
    it('should activate or deactivate account ', function (done) {
      (0, _supertest.default)(_index.default).patch("".concat(API_PREFIX, "/accounts/2040050222")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).expect(404).expect(function (response) {
        expect(response.body).to.eql({
          status: 404,
          error: 'Account Number not found'
        }).to.have.all.keys('status', 'error');
      });
      (0, _supertest.default)(_index.default).patch("".concat(API_PREFIX, "/accounts/2040050234")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).send({
        accountNumber: '2040050234',
        acctStatus: 'active',
        type: '',
        updatedOn: ''
      }).expect(200).expect(function (response) {
        expect(response.body).to.have.all.keys('status', 'message', 'data');
        expect(response.body.status).to.equal(200);
        expect(response.body.message).to.equal('Account has been succesfully updated');
        expect(response.body.data[0]).to.have.all.keys('id', 'accountNumber', 'acctStatus', 'type', 'updatedOn');
      }).end(done);
    });
  });
  describe('/ DELETE account ', function () {
    it('should delete a user account ', function (done) {
      (0, _supertest.default)(_index.default).delete("".concat(API_PREFIX, "/accounts/2040050222")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).expect(404).expect(function (response) {
        expect(response.body).to.eql({
          status: 404,
          error: 'Oooops! no record with such Account number'
        }).to.have.all.keys('status', 'error');
      });
      (0, _supertest.default)(_index.default).delete("".concat(API_PREFIX, "/accounts/2040050234")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).expect(200).expect(function (response) {
        expect(response.body).to.have.all.keys('status', 'message');
        expect(response.body.status).to.equal(200);
        expect(response.body.message).to.equal('Account has been deleted successfully');
      }).end(done);
    });
  });
});