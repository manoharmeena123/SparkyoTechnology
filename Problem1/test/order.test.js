const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../index'); 

describe('Orders API', () => {
    it('should get a list of orders', (done) => {
        request(app)
            .get('/order')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });
});
