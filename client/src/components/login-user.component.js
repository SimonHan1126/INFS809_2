import React, { Component } from 'react';
import axios from 'axios';
import userUtil from "../util/userUtil"

/**
 * User view of login page, enables functions through GUI interaction
 * Created by James Hughes
 * */
export default class LoginUsers extends Component {
    constructor(props) {

        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {

            username: '',
            password: ''

        }

    }

    onChangeUsername(e) {

        this.setState({
            username: e.target.value
        });

    }

    onChangePassword(e) {

        this.setState({
            password: e.target.value
        });

    }

    onSubmit(e) {
        let username = this.state.username;
        e.preventDefault();
        axios.post('/users/auth', {
            params: {
                username: username,
                password: this.state.password
            }
        })

            .then(function (res) {

                if(!res.data.err)
                {
                    alert(res.data.username + " login successfully");

                    axios.post('/whitelist/findOne', {username:username})
                        .then(function (res) {

                            if(!!res.err)
                            {
                                alert(res.err);
                            }
                            else
                            {
                                console.log("this is login 1111 " + username)
                                userUtil.setCurrentUsername(username)
                                userUtil.loginBar();
                            }
                        });
                }
                else
                {
                    console.log("status " + res.status + " error " + res.data.err)
                    alert(res.data.err);
                }
            });
    }

    render() {

        return (

            <div>
                <h3>Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                        <label>Password: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>

        )

    }

    }
