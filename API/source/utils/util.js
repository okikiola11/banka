import uniqueRandom from 'unique-random';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Accounts from './accountsData';

dotenv.config();

class Utility {
    static acctNumberGen() {
        const rand = uniqueRandom(1000000000, 9999999999);
        let accountNo = rand();
        let isUniqueAcct = false;
        while (!isUniqueAcct) {
            const checkAccountNo = Accounts.find(checkacct => checkacct.accountNumber === accountNo);
            if (checkAccountNo) {
                accountNo = rand();
            } else {
                isUniqueAcct = true;
            }
        }
        return accountNo;
    }

    // static generateToken(payload) {
    //     return jwt.sign(payload, process.env.secret, {
    //         expiresIn: '24h',
    //     });
    // }

    // static decodeToken(token) {
    //     return jwt.verify(token, process.env.secret);
    // }
}

export default Utility;
