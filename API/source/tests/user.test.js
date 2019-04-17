import chai from 'chai';

import request from 'supertest';

import app from '../index';

const { expect } = chai;

const API_PREFIX = '/api/v1';

describe('Test case for the default for the banka route /', () => {
    describe('/ testing for response', () => {
        it('should return a welcome message to the user', (done) => {
            request(app)
                .get('/')
                .expect(200)
                .expect((response) => {
                    expect(response.text)
                        .to.be.a('string')
                        .to.equal('Welcome, to the Web Banking Application!');
                })
                .end(done);
        });
    });

    describe('/ testing for endpoints that do not exist', () => {
        it('should return 404 error', (done) => {
            request(app)
                .get('/google')
                .expect(404)
                .expect((response) => {
                    expect(response.body)
                        .to.be.an('object')
                        .to.eql({
                            status: 404,
                            message:
                'The endpoint you have requested does not exist on this server',
                        })
                        .to.have.all.keys('status', 'message');
                })
                .end(done);
        });
    });
});

describe('/ User Auth Signup Endpoint ', () => {
    describe('/ user signup - User SignUp Validation Test(Required)', () => {
        it('user signup validation check', (done) => {
            request(app)
                .post(`${API_PREFIX}/auth/signup`)
                .set('Accept', 'application/json')
                .send({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    gender: '',
                    password: '',
                })
                .expect(401)
                .expect((response) => {
                    expect(response.body.status).to.equal(401);
                    expect(response.body.error).to.equal(
                        'Validation failed, check errors property for more details',
                    );
                    expect(response.body).to.have.all.keys('status', 'error', 'errors');
                })
                .end(done);
        });

        it('should allow a user to signup ', (done) => {
            request(app)
                .post(`${API_PREFIX}/auth/signup`)
                .set('Accept', 'application/json')
                .send({
                    firstName: 'Okikiola',
                    lastName: 'Apelehin',
                    email: 'user@gmail.com',
                    phone: '08023182819',
                    gender: 'female',
                    user: true,
                    password: 'okiki123',
                })
                .expect(201)
                .expect((response) => {
                    expect(response.body.status).to.equal(201);
                    expect(response.body.message).to.equal('New User has been created');
                    expect(response.body.data[0]).to.have.all.keys(
                        'auth',
                        'token',
                        'payLoad',
                    );
                })
                .end(done);
        });
    });
});

describe('/ User Auth Login Endpoint ', () => {
    describe('/ POST user login ', () => {
        it('user login validation check', (done) => {
            request(app)
                .post(`${API_PREFIX}/auth/signin`)
                .set('Accept', 'application/json')
                .send({
                    email: '',
                    password: '',
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

        it('POST /auth/signin - User Can\'t login with incorrect password', (done) => {
            request(app)
                .post(`${API_PREFIX}/auth/signin`)
                .send({
                    email: 'user@gmail.com',
                    password: 'okiki111',
                })
                .expect(401)
                .expect((response) => {
                    expect(response.body.status).to.equal(401);
                    expect(response.body.auth).to.equal('false');
                    expect(response.body.message).to.equal('Incorrect Password');
                })
                .end(done);
        });

        it('should allow a user to login after signing up ', (done) => {
            request(app)
                .post(`${API_PREFIX}/auth/signin`)
                .set('Accept', 'application/json')
                .send({
                    email: 'user@gmail.com',
                    password: 'okiki123',
                })
                .expect(200)
                .expect((response) => {
                    expect(response.body.status).to.equal(200);
                    expect(response.body.message).to.equal(
                        'Welcome user@gmail.com, you have successfully logged in',
                    );
                    expect(response.body.data[0]).to.have.all.keys(
                        'auth',
                        'token',
                        'payLoad',
                    );
                })
                .end(done);
        });
    });
});
