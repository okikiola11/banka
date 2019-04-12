import bcrypt from 'bcryptjs';

const User = [{
    id: 1,
    firstName: 'Okikiola',
    lastName: 'Apelehin',
    email: 'user@gmail.com',
    phone: '08023182819',
    gender: 'female',
    userType: {
        user: true,
        admin: false,
        staff: false,
    },
    password: bcrypt.hashSync('okiki123', bcrypt.genSaltSync(8)),
}, {
    id: 1,
    firstName: 'Okikiola',
    lastName: 'Apelehin',
    email: 'staff@gmail.com',
    phone: '08023182819',
    gender: 'female',
    userType: {
        user: false,
        admin: false,
        staff: true,
    },
    password: bcrypt.hashSync('okiki123', bcrypt.genSaltSync(8)),
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
        staff: true,
    },
    password: bcrypt.hashSync('okiki123', bcrypt.genSaltSync(8)),
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
        staff: false,
    },
    password: bcrypt.hashSync('okiki123', bcrypt.genSaltSync(8)),
}];

export default User;
