import {
    body,
    validationResult,
} from 'express-validator/check';

class Validation {
    static getValidationResult(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const validateErrors = errors.array();

            const errArray = validateErrors.map((obj) => {
                const rObj = {};
                rObj[obj.param] = obj.msg;
                rObj.value = obj.value;
                return rObj;
            });

            return res.status(401).json({
                status: 401,
                error: 'Validation failed, check errors property for more details',
                errors: errArray,
            });
        }
        return res.status(201).json({
            status: 201,
            message: 'Welcome, you have successfully logged in',
        });
    }

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
            body('phone').isNumeric().withMessage('You should enter only numeric')
                .exists()
                .withMessage('Field cannot be empty'),
            body('gender').isIn(['male', 'female']).withMessage('Choose a gender')
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
}

export default Validation;
