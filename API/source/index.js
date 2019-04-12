import express from 'express';
import bodyParser from 'body-parser';

import userRoutes from './routes/userRoutes';
import accountsRoutes from './routes/accountsRoutes';
import transactionRoutes from './routes/transactionRte';


const app = express();

app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Welcome, to the Web Banking Application!'));

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/accounts', accountsRoutes);
app.use('/api/v1/transactions/:accountNumber', transactionRoutes);

app.all('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'The endpoint you have requested does not exist on this server',
    });
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(` Server is running on PORT: ${port}`);
});

export default app;
