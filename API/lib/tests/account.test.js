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
    admin: false,
    staff: true
  }
}, _config.default.secret, {
  expiresIn: 86400 // expires cmdin 24hours

});

describe('/ User Account Auth Endpoint ', function () {
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
});