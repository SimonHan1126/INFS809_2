import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";

chai.use(chaiHttp);
chai.should();

describe("add whitelist ", () => {

    var param = {
        "username":"simonHan"
    };

    it("add whitelist request", done => {
        chai
            .request(app)
            .post("/whitelist/add")
            .send(param)
            .end((err, res) => {

                console.log("ADD WHITELIST res.body " + JSON.stringify(res.body) + " res.status " + res.status);
                res.should.have.status(200);
                done();

            });
    });
});