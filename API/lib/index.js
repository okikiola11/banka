'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.default = void 0;

let _express = _interopRequireDefault(require('express'));

let _bodyParser = _interopRequireDefault(require('body-parser'));

let _userRoutes = _interopRequireDefault(require('./routes/userRoutes'));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj,
    };
}

let app = (0, _express.default)();
app.use(_bodyParser.default.urlencoded({
    extended: false,
}));
app.use(_bodyParser.default.json());
app.get('/', (req, res) => {
  return res.send('Welcome, to the Web Banking Application!');
});
app.use('/api/v1/auth', _userRoutes.default);
app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'The endpoint you have requested does not exist on this server'
  });
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(" Server is running on PORT: ".concat(port));
});
let _default = app;
exports.default = _default;
