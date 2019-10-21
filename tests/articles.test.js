/**
 * Created by hanshihui on 12/10/19.
 */

import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";

chai.use(chaiHttp);
chai.should();

describe("save article ", () => {

    var bibtexString = "QGJvb2t7Ymh1cHRhbmkyMDA1cmZpZCwKICB0aXRsZT17UkZJRCBmaWVsZCBndWlkZTogZGVwbG95aW5nIHJhZGlvIGZyZXF1ZW5jeSBpZGVudGlmaWNhdGlvbiBzeXN0ZW1zfSwKICBhdXRob3I9e0JodXB0YW5pLCBNYW5pc2ggYW5kIE1vcmFkcG91ciwgU2hhaHJhbX0sCiAgeWVhcj17MjAwNX0sCiAgcHVibGlzaGVyPXtQcmVudGljZSBIYWxsIFBUUn0KfQ==";
    var param = {"params":{"bibTex" : bibtexString}}

    it("save article request", done => {
        chai
            .request(app)
            .post("/articles/post")
            .send(param)
            .end((err, res) => {

                console.log("SAVE ARTICLE res.body " + JSON.stringify(res.body) + " res.status " + res.status);
                res.should.have.status(200);
                done();

            });
    });
});

describe("get articles ", () => {

    it("get articles request", done => {
        chai
            .request(app)
            .get("/articles/")
            .end((err, res) => {

                console.log("GET ARTICLES res.body " + JSON.stringify(res.body) + " res.status " + res.status);
                res.should.have.status(200);
                done();

            });
    });
});

describe("get a specific article", () => {

    var param = {
        "_id":"5da2ddf31ac7d742bca4e50d"
    };
    it("get a specific article request", done => {
        chai
            .request(app)
            .get("/articles/:id")
            .send(param)
            .end((err, res) => {

                console.log("GET A SPECIFIC ARTICLE res.body " + JSON.stringify(res.body) + " res.status " + res.status);
                res.should.have.status(200);
                done();

            });
    });
});

describe("search articles", () => {

    var param = {
        "author":"Max Hardway"
    };
    it("search articles request ** ", done => {
        chai
            .request(app)
            .post("/articles/search")
            .send(param)
            .end((err, res) => {

                console.log("SEARCH ARTICLES res.body " + JSON.stringify(res.body) + " res.status " + res.status);
                res.should.have.status(200);
                done();

            });
    });
});