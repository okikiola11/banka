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
        if (req.data.isAdmin === 'true') {
            return res.status(403).json({
                status: 403,
                message: 'Access denied',
            });
        }
        next();
    }

    static viewAccountAuth(req, res, next) { // access to both admin&staff
        if (req.data.type === 'client') {
            return res.status(403).json({
                status: 403,
                message: 'Access denied',
            });
        }
        next();
    }
}

export default authorize;
