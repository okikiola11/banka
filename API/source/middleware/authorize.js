class authorize {
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
