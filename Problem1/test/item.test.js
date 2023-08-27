const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../index');

describe('Items API', () => {
    it('should get a list of items', (done) => {
        request(app)
            .get('/item')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

});
