import chai from 'chai';

import request from 'supertest';

import jwt from 'jsonwebtoken';

import config from '../config';

import app from '../index';

const { expect } = chai;

const API_PREFIX = '/api/v1';
const token = jwt.sign(
    {
        id: 1,
        userType: {
            user: true,
            admin: false,
            staff: false,
        },
    },
    config.secret,
    {
        expiresIn: 86400, // expires cmdin 24hours
    },
);
const staffToken = jwt.sign(
    {
        id: 1,
        userType: {
            user: false,
            admin: true,
            staff: true,
        },
    },
    config.secret,
    {
        expiresIn: 86400, // expires cmdin 24hours
    },
);

describe('/ User Account Auth Endpoint ', () => {
    describe('/ POST accounts - Account Setup (Required)', () => {
        it('should allow only user account option ', (done) => {
            request(app)
                .post(`${API_PREFIX}/accounts/`)
                .set('Accept', 'application/json')
                .set('Authorization', `${token}`)
                .send({
                    type: 'current',
                    openingBalance: '25000.00',
                })
                .expect(201)
                .expect((response) => {
                    expect(response.body).to.have.all.keys('status', 'message', 'data');
                    expect(response.body.status).to.equal(201);
                    expect(response.body.message).to.equal('Account has been created');
                    expect(response.body.data[0]).to.have.all.keys(
                        'id',
                        'ownerId',
                        'accountNumber',
                        'type',
                        'openingBalance',
                        'acctStatus',
                        'accountBalance',
                        'createdOn',
                    );
                })
                .end(done);
        });

        it('should create user accounts validation check', (done) => {
            request(app)
                .post(`${API_PREFIX}/accounts`)
                .set('Accept', 'application/json')
                .set('Authorization', `${token}`)
                .send({
                    type: '',
                    openingBalance: '25000.00',
                })
                .expect(401)
                .expect((response) => {
                    expect(response.body.status).to.equal(401);
                    expect(response.body.error).to.equal(
                        'Validation failed, check errors property for more details',
                    );
                })
                .end(done);
        });
    });

    describe('/ GET all accounts ', () => {
        it('should get all account ', (done) => {
            request(app)
                .get(`${API_PREFIX}/accounts`)
                .set('Accept', 'application/json')
                .set('Authorization', `${staffToken}`)
                .expect(200)
                .expect((response) => {
                    expect(response.body).to.have.all.keys('status', 'message', 'data');
                    expect(response.body.status).to.equal(200);
                    expect(response.body.message).to.equal(
                        'Successfully retrieved all accounts',
                    );
                    expect(response.body.data[0]).to.have.all.keys(
                        'id',
                        'ownerId',
                        'accountNumber',
                        'type',
                        'openingBalance',
                        'acctStatus',
                        'accountBalance',
                        'createdOn',
                    );
                })
                .end(done);
        });
    });
});
