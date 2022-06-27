let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../controllers/menu_controller');

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Menu API Test', () => {
  // Test GET route
  describe('GET /menu', () => {
    it('It should GET all the menu items', (done) => {
      chai.request(server)
        .get('/menu')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.length.should.be.eq(6);
        done();
        })
    })
  })
  // Test GET ByID route
  // Test POST route
  // Test PUT route
  // Test Delete router
})