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
const token = jwt.sign({
    id: 1,
    userType: {
        user: true,
        admin: false,
        staff: false,
    },
},
process.env.secret, {
    expiresIn: 86400, // expires cmdin 24hours
});
const staffToken = jwt.sign({
    id: 1,
    userType: {
        user: false,
        admin: true,
        staff: true,
    },
},
process.env.secret, {
    expiresIn: 86400, // expires cmdin 24hours
});

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
                    expect(response.body)
                        .to.have.all.keys('status', 'message', 'data');
                    expect(response.body.status)
                        .to.equal(201);
                    expect(response.body.message)
                        .to.equal('Account has been created');
                    expect(response.body.data[0])
                        .to.have.all.keys(
                            'id', 'ownerId', 'accountNumber', 'type', 'openingBalance', 'acctStatus', 'accountBalance', 'createdOn', 'updatedOn',
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

    describe('/ GET all accounts ', () => {
        it('should get all account ', (done) => {
            request(app)
                .get(`${API_PREFIX}/accounts`)
                .set('Accept', 'application/json')
                .set('Authorization', `${staffToken}`)
                .expect(200)
                .expect((response) => {
                    expect(response.body)
                        .to.have.all.keys('status', 'message', 'data');
                    expect(response.body.status)
                        .to.equal(200);
                    expect(response.body.message)
                        .to.equal('Successfully retrieved all accounts');
                    expect(response.body.data[0])
                        .to.have.all.keys(
                            'id', 'ownerId', 'accountNumber', 'type', 'openingBalance', 'acctStatus', 'accountBalance', 'createdOn', 'updatedOn',
                        );
                })
                .end(done);
        });
    });

    describe('/ GET a single user accounts ', () => {
        it('should get a single account ', (done) => {
            request(app)
                .get(`${API_PREFIX}/accounts/2040050234`)
                .set('Accept', 'application/json')
                .set('Authorization', `${staffToken}`)
                .expect(200)
                .expect((response) => {
                    expect(response.body)
                        .to.have.all.keys('status', 'message', 'data');
                    expect(response.body.status)
                        .to.equal(200);
                    expect(response.body.message)
                        .to.equal('Account has been successfully retrieved');
                    expect(response.body.data[0])
                        .to.have.all.keys(
                            'id', 'ownerId', 'accountNumber', 'type', 'openingBalance', 'acctStatus', 'accountBalance', 'createdOn', 'updatedOn',
                        );
                })
                .end(done);
        });

        it('should get an error message if the account number does not exist ', (done) => {
            request(app)
                .get(`${API_PREFIX}/accounts/2040050222`)
                .set('Accept', 'application/json')
                .set('Authorization', `${staffToken}`)
                .expect(404)
                .expect((response) => {
                    expect(response.body)
                        .to.eql({
                            status: 404,
                            error: 'Account does not exist',
                        })
                        .to.have.all.keys('status', 'error');
                })
                .end(done);
        });
    });
});

describe('/ UPDATE account ', () => {
    it('should send an error message if account is not found ', (done) => {
        request(app)
            .patch(`${API_PREFIX}/accounts/2040050222`)
            .set('Accept', 'application/json')
            .set('Authorization', `${staffToken}`)
            .send({
                acctStatus: 'active',
            })
            .expect(404)
            .expect((response) => {
                expect(response.body)
                    .to.eql({
                        status: 404,
                        error: 'Account Number not found',
                    })
                    .to.have.all.keys('status', 'error');
            })
            .end(done);
    });

    it('should activate or deactivate account ', (done) => {
        request(app)
            .patch(`${API_PREFIX}/accounts/2040050234`)
            .set('Accept', 'application/json')
            .set('Authorization', `${staffToken}`)
            .send({
                acctStatus: 'active',
            })
            .expect(200)
            .expect((response) => {
                expect(response.body)
                    .to.have.all.keys('status', 'message', 'data');
                expect(response.body.status)
                    .to.equal(200);
                expect(response.body.message)
                    .to.equal('Account has been succesfully updated');
                expect(response.body.data[0])
                    .to.have.all.keys(
                        'id', 'accountNumber', 'acctStatus', 'type', 'updatedOn',
                    );
            })
            .end(done);
    });

    it('should send an error message if Validation fails ', (done) => {
        request(app)
            .patch(`${API_PREFIX}/accounts/2040050222`)
            .set('Accept', 'application/json')
            .set('Authorization', `${staffToken}`)
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

describe('/ DELETE account ', () => {
    it('should return an error message if user record was not found ', (done) => {
        request(app)
            .delete(`${API_PREFIX}/accounts/2040050222`)
            .set('Accept', 'application/json')
            .set('Authorization', `${staffToken}`)
            .expect(404)
            .expect((response) => {
                expect(response.body)
                    .to.eql({
                        status: 404,
                        error: 'Oooops! no record with such Account number',
                    })
                    .to.have.all.keys('status', 'error');
            })
            .end(done);
    });

    it('should delete a user account ', (done) => {
        request(app)
            .delete(`${API_PREFIX}/accounts/2040050234`)
            .set('Accept', 'application/json')
            .set('Authorization', `${staffToken}`)
            .expect(200)
            .expect((response) => {
                expect(response.body)
                    .to.have.all.keys('status', 'message');
                expect(response.body.status)
                    .to.equal(200);
                expect(response.body.message)
                    .to.equal('Account has been deleted successfully');
            })
            .end(done);
    });
});
