class authorize {
    static authTransaction(req, res, next) {
        if (!req.data.userType.staff) {
            return res.status(403).json({
                status: 403,
                message: 'Access denied',
            });
        }
        next();
    }

    static createAccountAuth(req, res, next) {
        if (!req.data.userType.user) {
            return res.status(403).json({
                status: 403,
                message: 'Access denied',
            });
        }
        next();
    }
}

export default authorize;
