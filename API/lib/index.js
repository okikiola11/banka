"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));

var _accountsRoutes = _interopRequireDefault(require("./routes/accountsRoutes"));

var _transactionRte = _interopRequireDefault(require("./routes/transactionRte"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.get('/', function (req, res) {
  return res.send('Welcome, to the Web Banking Application!');
});
app.use('/api/v1', _userRoutes.default);
app.use('/api/v1/accounts', _accountsRoutes.default);
app.use('/api/v1/transactions', _transactionRte.default);
app.all('*', function (req, res) {
  res.status(404).json({
    status: 404,
    message: 'The endpoint you have requested does not exist on this server'
  });
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log(" Server is running on PORT: ".concat(port));
});
var _default = app;
exports.default = _default;