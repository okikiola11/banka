"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _supertest = _interopRequireDefault(require("supertest"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = require("dotenv");

var _account = _interopRequireDefault(require("./account.test"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();
var expect = _chai.default.expect;
var API_PREFIX = '/api/v1';

var staffToken = _jsonwebtoken.default.sign({
  id: 1,
  type: 'staff',
  isAdmin: false
}, process.env.SECRET, {
  expiresIn: 86400 // expires cmdin 24hours

});

describe('/ Transaction Account Endpoint ', function () {
  describe('/ POST credit account transaction', function () {
    it('should be able to credit a bank account', function (done) {
      (0, _supertest.default)(_index.default).post("".concat(API_PREFIX, "/transactions/2050030401/credit")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).send({
        amount: '25000.00'
      }).expect(201).expect(function (response) {
        expect(response.body).to.have.all.keys('status', 'message', 'data');
        expect(response.body.status).to.equal(201);
        expect(response.body.message).to.equal('Account has been successfully credited');
        expect(response.body.data).to.have.all.keys('transactionId', 'accountNumber', 'amount', 'cashier', 'transactionType', 'accountBalance');
      }).end(done);
    });
    it('should restrict non-staff members (i.e clients) from crediting an account', function (done) {
      (0, _supertest.default)(_index.default).post("".concat(API_PREFIX, "/transactions/2050030401/credit")).set('Accept', 'application/json').set('Authorization', "".concat(_account.default)).send({
        amount: '25000.00'
      }).expect(403).expect(function (response) {
        expect(response.body).to.have.all.keys('status', 'message');
        expect(response.body.status).to.equal(403);
        expect(response.body.message).to.equal('Access denied');
      }).end(done);
    });
    it('should validate credit account check', function (done) {
      (0, _supertest.default)(_index.default).post("".concat(API_PREFIX, "/transactions/2050030401/credit")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).send({
        amount: ''
      }).expect(400).expect(function (response) {
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.equal('Validation failed, check errors property for more details');
      }).end(done);
    });
  });
});
describe('/ Transaction Account Endpoint ', function () {
  describe('/ POST debit account transaction', function () {
    it('should be able to debit a bank account', function (done) {
      (0, _supertest.default)(_index.default).post("".concat(API_PREFIX, "/transactions/2050030455/debit")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).send({
        amount: '25000.00'
      }).expect(201).expect(function (response) {
        expect(response.body).to.have.all.keys('status', 'message', 'data');
        expect(response.body.status).to.equal(201);
        expect(response.body.message).to.equal('Account has been successfully debited');
        expect(response.body.data).to.have.all.keys('transactionId', 'accountNumber', 'amount', 'cashier', 'transactionType', 'accountBalance');
      }).end(done);
    });
    it('should restrict non-staff members (i.e clients) from debiting an account', function (done) {
      (0, _supertest.default)(_index.default).post("".concat(API_PREFIX, "/transactions/2050030455/debit")).set('Accept', 'application/json').set('Authorization', "".concat(_account.default)).send({
        amount: '25000.00'
      }).expect(403).expect(function (response) {
        expect(response.body).to.have.all.keys('status', 'message');
        expect(response.body.status).to.equal(403);
        expect(response.body.message).to.equal('Access denied');
      }).end(done);
    });
    it('should validate debit account check', function (done) {
      (0, _supertest.default)(_index.default).post("".concat(API_PREFIX, "/transactions/2050030401/debit")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).send({
        amount: ''
      }).expect(400).expect(function (response) {
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.equal('Validation failed, check errors property for more details');
      }).end(done);
    });
  });
});
describe('/ Transaction Account Endpoint ', function () {
  describe('/ GET a particular account transaction', function () {
    it('should get a specific bank account transaction', function (done) {
      (0, _supertest.default)(_index.default).get("".concat(API_PREFIX, "/transactions/1")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).expect(200).expect(function (response) {
        expect(response.body).to.have.all.keys('status', 'message', 'data');
        expect(response.body.status).to.equal(200);
        expect(response.body.message).to.equal('Transaction has been successfully retrieved');
        expect(response.body.data).to.have.all.keys('transactionId', 'accountNumber', 'amount', 'type', 'oldBalance', 'newBalance', 'createdOn');
      }).end(done);
    });
    it('should get an error message if there is no bank account transaction', function (done) {
      (0, _supertest.default)(_index.default).get("".concat(API_PREFIX, "/transactions/100")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).expect(404).expect(function (response) {
        expect(response.body).to.eql({
          status: 404,
          error: 'No account transaction found'
        }).to.have.all.keys('status', 'error');
      }).end(done);
    });
  });
});
describe('/ Transaction Account Endpoint ', function () {
  describe('/ GET transaction history for a specific account', function () {
    it('should get a bank account transaction', function (done) {
      (0, _supertest.default)(_index.default).get("".concat(API_PREFIX, "/accounts/2050030401/transactions")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).expect(200).expect(function (response) {
        expect(response.body).to.have.all.keys('status', 'message', 'data');
        expect(response.body.status).to.equal(200);
        expect(response.body.message).to.equal('Successfully retrieved transaction history');
        expect(response.body.data[0]).to.have.all.keys('transactionid', 'accountnumber', 'amount', 'cashierid', 'transactiontype', 'oldbalance', 'newbalance', 'createdon');
      }).end(done);
    });
    it('should get a bank account transaction', function (done) {
      (0, _supertest.default)(_index.default).get("".concat(API_PREFIX, "/accounts/2050030190/transactions")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).expect(200).expect(function (response) {
        expect(response.body).to.have.all.keys('status', 'message', 'data');
        expect(response.body.status).to.equal(200);
        expect(response.body.message).to.equal('No transaction history');
      }).end(done);
    });
    it('should get an error message if there is no bank account transaction', function (done) {
      (0, _supertest.default)(_index.default).get("".concat(API_PREFIX, "/accounts/1050030401/transactions")).set('Accept', 'application/json').set('Authorization', "".concat(staffToken)).expect(404).expect(function (response) {
        expect(response.body).to.eql({
          status: 404,
          message: 'The requested account does not exist'
        }).to.have.all.keys('status', 'message');
      }).end(done);
    });
  });
});