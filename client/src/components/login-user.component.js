import React, { Component } from 'react';
import axios from 'axios';

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

        e.preventDefault();
        //const user = {
            //username: this.state.username,
           // password: this.state.password
        //}
        axios.get('http://localhost:5000/users/users', {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
            //.then(res => console.log(res.data));
        console.log("log in successful");
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