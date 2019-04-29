import Accounts from '../models/accountModel';

class authorize {
    static async authTransaction(req, res, next) {
        await req.data.type;
        console.log(req.data.type);
        if (req.data.type === 'client') {
            return res.status(403).json({
                status: 403,
                message: 'Access denied',
            });
        }
        return next();
    }

    static async clientAccount(req, res, next) {
        if (req.data.type === 'client') {
            const isQuery = Object.keys(req.query).length;
            if (isQuery) {
                const {
                    status,
                } = req.query;
                if (status === 'dormant') {
                    const accounts = await Accounts.clientDormantAccount(req.data.id);
                    if (accounts.length === 0) {
                        return res.status(200).json({
                            status: 200,
                            message: 'There are no existing dormant account',
                            data: accounts,
                        });
                    }
                    return res.status(200).json({
                        status: 200,
                        message: 'Successfully retrieved all dormant accounts',
                        data: accounts,
                    });
                }
                if (status === 'active') {
                    const accounts = await Accounts.clientActiveAccount(req.data.id);
                    if (accounts.length === 0) {
                        return res.status(200).json({
                            status: 200,
                            message: 'There are no existing active account',
                            data: accounts,
                        });
                    }
                    return res.status(200).json({
                        status: 200,
                        message: 'Successfully retrieved all active accounts',
                        data: accounts,
                    });
                }
                if (status === 'draft') {
                    const accounts = await Accounts.clientDraftAccount(req.data.id);
                    if (accounts.length === 0) {
                        return res.status(200).json({
                            status: 200,
                            message: 'There are no existing draft account',
                            data: accounts,
                        });
                    }
                    return res.status(200).json({
                        status: 200,
                        message: 'Successfully retrieved all draft accounts',
                        data: accounts,
                    });
                }
            }
            const accounts = await Accounts.getClientAccounts(req.data.id);
            if (accounts.length === 0) {
                return res.status(200).json({
                    status: 200,
                    message: 'There are no existing account',
                    data: accounts,
                });
            }
            return res.status(200).json({
                status: 200,
                message: 'Successfully retrieved all accounts',
                data: accounts,
            });
        }
        return next();
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
