import express from 'express';

const app = express();


app.get('/', (req, res) => res.send('Welcome, to the Web Banking Application!'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(` Server is running on PORT: ${port}`);
});