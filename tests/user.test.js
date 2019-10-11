/**
 * Created by hanshihui on 11/10/19.
 */
const mongoose = require('mongoose');
const request = require('supertest');
const session = require('supertest-session');
const { expect, assert } = require('chai');
const { internet } = require('faker');

const app = require('../server');
const testDB = "mongodb+srv://trooblet:h8VKMShGXf8TlmUL@cluster0-dhsg3.gcp.mongodb.net/admin?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;

describe('User test', function() {
    it('app module is defined', function() {
        assert.isDefined(app);
    });

    // let server;

    before('connect to db, run server', async function() {
        // this.timeout(20000);
        try {
            // server = await app.listen(5000);
            await mongoose.connect(
                testDB,
                { useNewUrlParser: true }
            );
        } catch (e) {
            throw new Error(e);
        }
    });

    describe('signup test', function() {
        const userData = {
            username: internet.userName(),
            password: internet.password()
        };

        const error = {
            name: 'YOU DONE GOOFED',
            message: `${userData.username} is taken!`
        };

        it('send request to register', async function() {

            await request(app)
                .post('/users/add')
                .send(userData)
                .set('Content-Type', 'application/json')
                .expect(200)
                .expect(res => {
                    console.log("sign up 8888888 " + res.body);
                    expect(res.body.user).to.have.property('id');
                    expect(res.body.user).to.have.property('username', userData.username);
                });
        });

        // it('returns 400 if username already exists', async function() {
        //     await request(server)
        //         .post('/users/add')
        //         .send(userData)
        //         .set('Content-Type', 'application/json')
        //         .expect(400)
        //         .expect(res => {
        //             expect(res.body.error).to.deep.equal(error);
        //         });
        // });
    });

    describe('logIn test', function() {
        const error = {
            name: 'YOU DONE GOOFED',
            message: 'Click out and try again!'
        };
        const userData = {
            username: internet.userName(),
            password: internet.password()
        };

        before('set request to login', function(done) {
            request(app)
                .post('/users')
                .send(userData)
                .set('Content-Type', 'application/json')
                .end(() => {
                    console.log('db populated');
                    done();
                });
        });

        // after('clean db', async function() {
        //     await UserModel.remove({});
        // });

        // it('responds w/400 and error message if password invalid', async function() {
        //     await request(server)
        //         .post('/users')
        //         .send({ username: userData.username, password: internet.password() })
        //         .set('Content-Type', 'application/json')
        //         .expect(400)
        //         .expect(res => {
        //             expect(res.body.error).deep.equal(error);
        //         });
        // });

        it('returns username and id if password valid', async function() {
            await request(app)
                .post('/user/login')
                .send(userData)
                .set('Content-Type', 'application/json')
                .expect(200)
                .expect(res => {
                    expect(res.body.user).to.have.property('id');
                    expect(res.body.user).to.have.property('username', userData.username);
                });
        });
    });
});
