/**
 * Created by hanshihui on 12/10/19.
 */

import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";

chai.use(chaiHttp);
chai.should();

describe("register ", () => {

    var date = new Date();
    var param = {
        username: "testName " + date.getYear() + date.getMonth() + date.getDay() + date.getHours() + date.getMinutes(),
        password: "testName123456"
    };

    it("register request ", done => {
        chai
            .request(app)
            .post("/users/add")
            .send(param)
            .end((err, res) => {

                console.log("res.body " + JSON.stringify(res.body) + " res.status " + res.status);
                res.should.have.status(200);
                done();

            });
    });
});

describe("login ", () => {

    var date = new Date();
    var param = {
        username: "testName " + date.getYear() + date.getMonth() + date.getDay() + date.getHours() + date.getMinutes(),
        password: "testName123456"
    };

    it("login request ", done => {
        chai
            .request(app)
            .post("/users/auth")
            .send(param)
            .end((err, res) => {

                console.log("res.body " + JSON.stringify(res.body) + " res.status " + res.status);
                res.should.have.status(200);
                done();

            });
    });
});