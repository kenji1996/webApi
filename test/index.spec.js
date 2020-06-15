const supertest = require('supertest');
const app = require('../index');

describe("GET /", function () {
    it("it should have status code 200", function (done) {
        supertest(app)
            .get("/")
            .expect(200)
            .end(funcion (err, res) {
                if (err) done(err);
                done();
            });
    });
});