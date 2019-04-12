import chai from 'chai';

import request from 'supertest';

import app from '../index';

const {
    expect,
} = chai;

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
                            message: 'The endpoint you have requested does not exist on this server',
                        })
                        .to.have.all.keys('status', 'message');
                })
                .end(done);
        });
    });
});
