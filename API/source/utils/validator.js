import {
    body,
} from 'express-validator/check';

class Validation {
    static validateSignUp() {
        return [
            body('firstName').isAlpha().withMessage('You should enter only alphabet')
                .exists()
                .withMessage('Field cannot be empty'),
            body('lastName').isAlpha().withMessage('You should enter only alphabet')
                .exists()
                .withMessage('Field cannot be empty'),
            body('email').isEmail().withMessage('Should be a valid email')
                .exists()
                .withMessage('Field cannot be empty'),
            body('password').isAlphanumeric().withMessage('You should enter only alphanumeric')
                .isLength({
                    min: 5,
                })
                .withMessage('Should be atleast 5 characters')
                .exists()
                .withMessage('Field cannot be empty'),
        ];
    }

    static validateUser() {
        return [
            body('firstName').isAlpha().withMessage('You should enter only alphabet')
                .exists()
                .withMessage('Field cannot be empty'),
            body('lastName').isAlpha().withMessage('You should enter only alphabet')
                .exists()
                .withMessage('Field cannot be empty'),
            body('email').isEmail().withMessage('Should be a valid email')
                .exists()
                .withMessage('Field cannot be empty'),
            body('password').isAlphanumeric().withMessage('You should enter only alphanumeric')
                .isLength({
                    min: 5,
                })
                .withMessage('Should be atleast 5 characters')
                .exists()
                .withMessage('Field cannot be empty'),
            body('type').isIn(['staff', 'admin']).withMessage('Should either be an Admin or staff account')
                .exists()
                .withMessage('Field cannot be empty'),
            body('isadmin').isIn(['true', 'false']).withMessage('Should either be true or false')
                .exists()
                .withMessage('Field cannot be empty'),
        ];
    }

    static validateLogin() {
        return [
            body('email').isEmail().withMessage('Should be a valid email')
                .exists()
                .withMessage('Field cannot be empty'),
            body('password').isAlphanumeric().withMessage('You should enter only alphanumeric')
                .isLength({
                    min: 5,
                })
                .withMessage('Should be atleast 5 characters')
                .exists()
                .withMessage('Field cannot be empty'),
        ];
    }

    static validateAccount() {
        return [
            body('type').isIn(['savings', 'current']).withMessage('Choose a valid account type')
                .exists()
                .withMessage('Field cannot be empty'),
        ];
    }

    static validateUpdateAccount() {
        return [
            body('status').isIn(['dormant', 'active']).withMessage('Choose a valid account status')
                .exists()
                .withMessage('Field cannot be empty'),
        ];
    }

    static validateTransaction() {
        return [
            body('amount').isNumeric().withMessage('You should enter only numeric')
                .exists()
                .withMessage('Field cannot be empty'),
        ];
    }
}

export default Validation;
