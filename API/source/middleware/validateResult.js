import {
    validationResult,
} from 'express-validator/check';

class Validate {
    static validateResult(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const validateErrors = errors.array();

            const errArray = validateErrors.map((obj) => {
                const rObj = {};
                rObj[obj.param] = obj.msg;
                rObj.value = obj.value;
                return rObj;
            });

            return res.status(400).json({
                status: 400,
                error: 'Validation failed, check errors property for more details',
                errors: errArray,
            });
        }
        return next();
    }
}

export default Validate;
