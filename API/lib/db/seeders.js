"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var seeders = "\n    INSERT INTO users (firstName, lastName, email, password, type, isAdmin)\n    VALUES ('John', 'Doe', 'john.doe@gmail.com', '".concat(_bcryptjs.default.hashSync('johnny', 8), "', 'staff', 'true' );\n\n    INSERT INTO users (firstName, lastName, email, password, type)\n    VALUES ('mary', 'Doe', 'mary.doe@gmail.com', '").concat(_bcryptjs.default.hashSync('marydoe', 8), "', 'staff');\n\n    INSERT INTO users (firstName, lastName, email, password)\n    VALUES ('Smith', 'Doe', 'smith.doe@gmail.com', '").concat(_bcryptjs.default.hashSync('smithdoe', 8), "'),\n    ('Seun', 'Williams', 'seun.w@gmail.com', '").concat(_bcryptjs.default.hashSync('seunwil', 8), "'),\n    ('Mary', 'Sean', 'mary.sean@gmail.com', '").concat(_bcryptjs.default.hashSync('marysean', 8), "');\n\n    INSERT INTO accounts (accountNumber, ownerID, status, balance, type)\n    VALUES ('2050030401', 4, 'active', '20000', 'savings' ),\n    ('2050030485', 4, 'dormant', '20000', 'current' ),\n    ('2050030455', 4, 'draft', '25000', 'current' ),\n    ('2050030190', 4, 'dormant', '25000', 'current' );\n    INSERT INTO transactions (accountNumber, amount, cashierID, transactionType, oldBalance, newBalance)\n    VALUES ('2050030400', '20000', 2, 'credit', '3000', '23000' );\n\n");
var _default = seeders;
exports.default = _default;