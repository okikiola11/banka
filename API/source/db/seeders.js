import bcrypt from 'bcryptjs';

const seeders = `
    INSERT INTO users (firstName, lastName, email, password, type, isAdmin)
    VALUES ('John', 'Doe', 'john.doe@gmail.com', '${bcrypt.hashSync('johnny', 8)}', 'staff', 'true' );

    INSERT INTO users (firstName, lastName, email, password, type)
    VALUES ('mary', 'Doe', 'mary.doe@gmail.com', '${bcrypt.hashSync('marydoe', 8)}', 'staff');

    INSERT INTO users (firstName, lastName, email, password)
    VALUES ('Smith', 'Doe', 'smith.doe@gmail.com', '${bcrypt.hashSync('smithdoe', 8)}'),
    ('Seun', 'Williams', 'seun.w@gmail.com', '${bcrypt.hashSync('seunwil', 8)}'),
    ('Mary', 'Sean', 'mary.sean@gmail.com', '${bcrypt.hashSync('marysean', 8)}');

    INSERT INTO accounts (accountNumber, ownerID, status, balance, type)
    VALUES ('2050030401', 4, 'active', '20000', 'savings' ),
    ('2050030485', 4, 'dormant', '20000', 'current' ),
    ('2050030455', 4, 'draft', '25000', 'current' ),
    ('2050030190', 4, 'dormant', '25000', 'current' );
    INSERT INTO transactions (accountNumber, amount, cashierID, transactionType, oldBalance, newBalance)
    VALUES ('2050030400', '20000', 2, 'credit', '3000', '23000' );

`;

export default seeders;
