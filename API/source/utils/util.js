import uniqueRandom from 'unique-random';

import Accounts from './accountsData';

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
}

export default Utility;
