import chai from 'chai';

import request from 'supertest';

import jwt from 'jsonwebtoken';

import {
    config,
} from 'dotenv';

import app from '../index';

config();

const {
    expect,
} = chai;

const API_PREFIX = '/api/v1';
const staffToken = jwt.sign({
        id: 1,
        type: 'staff',
        isAdmin: false,
    },
    process.env.SECRET, {
        expiresIn: 86400, // expires cmdin 24hours
    });
const clientToken = jwt.sign({
        id: 3456,
        type: 'client',
        isAdmin: false
    },
    process.env.SECRET, {
        expiresIn: 86400, // expires cmdin 24hours
    });

describe('/ Transaction Account Endpoint ', () => {
    describe('/ POST credit account transaction', () => {
        it('should be able to credit a bank account', (done) => {
            request(app)
                .post(`${API_PREFIX}/transactions/2050030401/credit`)
                .set('Accept', 'application/json')
                .set('Authorization', `${staffToken}`)
                .send({
                    amount: '25000.00',
                })
                .expect(201)
                .expect((response) => {
                    expect(response.body)
                        .to.have.all.keys('status', 'message', 'data');
                    expect(response.body.status)
                        .to.equal(201);
                    expect(response.body.message)
                        .to.equal('Account has been successfully credited');
                    expect(response.body.data)
                        .to.have.all.keys(
                            'transactionId', 'accountNumber', 'amount', 'cashier', 'transactionType', 'accountBalance',
                        );
                })
                .end(done);
        });
        it('should restrict non-staff members (i.e clients) from crediting an account', (done) => {
            request(app)
                .post(`${API_PREFIX}/transactions/2050030401/credit`)
                .set('Accept', 'application/json')
                .set('Authorization', `${clientToken}`)
                .send({
                    amount: '25000.00',
                })
                .expect(403)
                .expect((response) => {
                    expect(response.body)
                        .to.have.all.keys('status', 'message');
                    expect(response.body.status)
                        .to.equal(403);
                    expect(response.body.message)
                        .to.equal('Access denied');
                })
                .end(done);
        });
        it('should validate credit account check', (done) => {
            request(app)
                .post(`${API_PREFIX}/transactions/2050030401/credit`)
                .set('Accept', 'application/json')
                .set('Authorization', `${staffToken}`)
                .send({
                    amount: '',
                })
                .expect(400)
                .expect((response) => {
                    expect(response.body.status)
                        .to.equal(400);
                    expect(response.body.error)
                        .to.equal('Validation failed, check errors property for more details');
                })
                .end(done);
        });
    });
});

describe('/ Transaction Account Endpoint ', () => {
    describe('/ POST debit account transaction', () => {
        it('should be able to debit a bank account', (done) => {
            request(app)
                .post(`${API_PREFIX}/transactions/2050030455/debit`)
                .set('Accept', 'application/json')
                .set('Authorization', `${staffToken}`)
                .send({
                    amount: '25000.00',
                })
                .expect(201)
                .expect((response) => {
                    expect(response.body)
                        .to.have.all.keys('status', 'message', 'data');
                    expect(response.body.status)
                        .to.equal(201);
                    expect(response.body.message)
                        .to.equal('Account has been successfully debited');
                    expect(response.body.data)
                        .to.have.all.keys(
                            'transactionId', 'accountNumber', 'amount', 'cashier', 'transactionType', 'accountBalance',
                        );
                })
                .end(done);
        });
        it('should restrict non-staff members (i.e clients) from debiting an account', (done) => {
            request(app)
                .post(`${API_PREFIX}/transactions/2050030455/debit`)
                .set('Accept', 'application/json')
                .set('Authorization', `${clientToken}`)
                .send({
                    amount: '25000.00',
                })
                .expect(403)
                .expect((response) => {
                    expect(response.body)
                        .to.have.all.keys('status', 'message');
                    expect(response.body.status)
                        .to.equal(403);
                    expect(response.body.message)
                        .to.equal('Access denied');
                })
                .end(done);
        });
        it('should validate debit account check', (done) => {
            request(app)
                .post(`${API_PREFIX}/transactions/2050030401/debit`)
                .set('Accept', 'application/json')
                .set('Authorization', `${staffToken}`)
                .send({
                    amount: '',
                })
                .expect(400)
                .expect((response) => {
                    expect(response.body.status)
                        .to.equal(400);
                    expect(response.body.error)
                        .to.equal('Validation failed, check errors property for more details');
                })
                .end(done);
        });
    });
});

describe('/ Transaction Account Endpoint ', () => {
    describe('/ GET a particular account transaction', () => {
        it('should get a specific bank account transaction', (done) => {
            request(app)
                .get(`${API_PREFIX}/transactions/1`)
                .set('Accept', 'application/json')
                .set('Authorization', `${staffToken}`)
                .expect(200)
                .expect((response) => {
                    expect(response.body)
                        .to.have.all.keys('status', 'message', 'data');
                    expect(response.body.status)
                        .to.equal(200);
                    expect(response.body.message)
                        .to.equal('Transaction has been successfully retrieved');
                    expect(response.body.data)
                        .to.have.all.keys(
                            'transactionId', 'accountNumber', 'amount', 'type', 'oldBalance', 'newBalance', 'createdOn',
                        );
                })
                .end(done);
        });

        it('should get an error message if there is no bank account transaction', (done) => {
            request(app)
                .get(`${API_PREFIX}/transactions/100`)
                .set('Accept', 'application/json')
                .set('Authorization', `${staffToken}`)
                .expect(404)
                .expect((response) => {
                    expect(response.body)
                        .to.eql({
                            status: 404,
                            error: 'No account transaction found',
                        })
                        .to.have.all.keys('status', 'error');
                })
                .end(done);
        });
    });
});