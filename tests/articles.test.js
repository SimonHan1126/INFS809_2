/**
 * Created by hanshihui on 12/10/19.
 */

import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";

chai.use(chaiHttp);
chai.should();

describe("save article ", () => {

    var param = {
        title: "software development",
        author: "Max Hardway"
    };

    it("save article request", done => {
        chai
            .request(app)
            .post("/articles/post")
            .send(param)
            .end((err, res) => {

                console.log("res.body " + JSON.stringify(res.body) + " res.status " + res.status);
                res.should.have.status(200);
                done();

            });
    });
});