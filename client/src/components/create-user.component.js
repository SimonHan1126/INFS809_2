import React, { Component } from 'react';
import axios from 'axios';
import userUtil from "../util/userUtil"

/**
 * User view of registration page, enables functions through GUI interactions
 * Created by James Hughes
 * */
export default class CreateUsers extends Component {
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

        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('/users/add', user)
            .then(function (res) {
                axios.post('/whitelist/findOne', {username:"simonHan"})
                    .then(function (res) {

                        if(!!res.err)
                        {
                            alert(res.err);
                        }
                        else
                        {
                            userUtil.registerBar();
                        }

                    });

            });

        //Redirect user after signin
        //window.location = '/';

        this.setState({
            username: '',
            password: ''
        })
    }

    render() {

        return (

            <div>
                <h3>Create new user</h3>
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
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>

        )

    }

}
