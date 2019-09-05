// Import the dependencies for testing
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";
// Configure chai
chai.use(chaiHttp);
chai.should();

// describe("Users", () => {
//   describe("GET /users", () => {
//     it("should get all user record", done => {
//       chai
//         .request(app)
//         .get("/users")
//         .end((err, res) => {
//           res.should.have.status(200);
//           done();
//         });
//     });
//   });
// });
