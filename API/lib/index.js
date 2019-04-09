"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.get('/', function (req, res) {
  return res.send('Welcome, to the Web Banking Application!');
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(" Server is running on PORT: ".concat(port));
});