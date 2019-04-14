"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = [{
  id: 1,
  firstName: 'Okikiola',
  lastName: 'Apelehin',
  email: 'user@gmail.com',
  phone: '08023182819',
  gender: 'female',
  userType: {
    user: true,
    admin: false,
    staff: false
  },
  password: _bcryptjs.default.hashSync('okiki123', _bcryptjs.default.genSaltSync(8))
}, {
  id: 2,
  firstName: 'Okikiola',
  lastName: 'Apelehin',
  email: 'staff@gmail.com',
  phone: '08023182819',
  gender: 'female',
  userType: {
    user: false,
    admin: false,
    staff: true
  },
  password: _bcryptjs.default.hashSync('okiki123', _bcryptjs.default.genSaltSync(8))
}, {
  id: 3,
  firstName: 'Oluwaseun',
  lastName: 'Williams',
  email: 'admin@gmail.com',
  phone: '08023182459',
  gender: 'Male',
  userType: {
    user: false,
    admin: true,
    staff: false
  },
  password: _bcryptjs.default.hashSync('okiki123', _bcryptjs.default.genSaltSync(8))
}];
var _default = User;
exports.default = _default;