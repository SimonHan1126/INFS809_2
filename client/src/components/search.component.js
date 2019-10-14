import React, { Component } from 'react';
import axios from 'axios';

/**
 * User view of registration page, enables functions through GUI interactions
 * Created by James Hughes
 * */
export default class Search extends Component {
    constructor(props) {

        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }


    onSubmit(e) {

        e.preventDefault();

        axios.post('/users/auth', {
            params: {
                // username: this.state.username,
                // password: this.state.password
            }
        })
        //.then(res => console.log(res.data));

            .then(function (res) {

                // if(!res.data.err)
                // {
                //     console.log(res.data.username + " login successfully");
                // }
                // else
                // {
                //     console.log("status " + res.status + " error " + res.data.err)
                // }
            });
    }

    render() {

        return (


            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="submit" value="Search" className="btn btn-primary" />
                    </div>
                </form>
            </div>

        )

    }

}
