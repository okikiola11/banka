"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _supertest = _interopRequireDefault(require("supertest"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai.default.expect;
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