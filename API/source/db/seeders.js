const seeders = `
    INSERT INTO users (firstName, lastName, email, password, type, isAdmin)
    VALUES ('John', 'Doe', 'john.doe@gmail.com', 'johnny', 'staff', 'true' );

    INSERT INTO users (firstName, lastName, email, password, type)
    VALUES ('mary', 'Doe', 'mary.doe@gmail.com', 'mary', 'staff');

    INSERT INTO users (firstName, lastName, email, password)
    VALUES ('Smith', 'Doe', 'smith.doe@gmail.com', 'smith'),
    ('Seun', 'Williams', 'seun.w@gmail.com', 'seun'),
    ('Mary', 'Sean', 'mary.sean@gmail.com', 'john');

    INSERT INTO accounts (accountNumber, ownerID, status, balance, type)
    VALUES ('2050030400', 4, 'active', '20000', 'savings' );

    INSERT INTO transactions (accountNumber, amount, cashierID, transactionType, accountBalance)
    VALUES ('2050030400', '20000', 2, 'credit', '23000' );

`;

export default seeders;