/**
 * Created by hanshihui on 12/10/19.
 */

import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";

chai.use(chaiHttp);
chai.should();

var date = new Date();

var year = date.getFullYear()
var month = date.getMonth() + 1;
var day = date.getDate();
var hours = date.getHours();
var minutes = date.getMinutes();
var seconds = date.getSeconds();


describe("register ", () => {
    var param = {
        username: "testName" + year + month + day + hours + minutes + seconds,
        password: "testName123456"
    };

    it("register request ", done => {
        chai
            .request(app)
            .post("/users/add")
            .send(param)
            .end((err, res) => {

                console.log("REGISTER res.body " + JSON.stringify(res.body) + " res.status " + res.status);
                res.should.have.status(200);
                done();

            });
    });
});

describe("login ", () => {


    console.log("this is login TEST year " + year + " month " + month + " day " + day + " hours " + hours + " minutes " + minutes + " seconds " + seconds);

    var param = {

        params : {
            username: "testName" + year + month + day + hours + minutes + seconds,
            password: "testName123456"
        }
    };

    it("login request ", done => {
        chai
            .request(app)
            .post("/users/auth")
            .send(param)
            .end((err, res) => {

                console.log("LOGIN res.body " + JSON.stringify(res.body) + " res.status " + res.status);
                res.should.have.status(200);
                done();

            });
    });
});


describe("get all users ", () => {

    it("get all users request ", done => {
        chai
            .request(app)
            .post("/users/users")
            // .set('content-type', 'application/json; charset=utf-8')
            .end((err, res) => {
                console.log("GET ALL USERS application/json res.body " + JSON.stringify(res.body) + " res.status " + res.status);
                res.should.have.status(200);
                done();

            });
    });
});


