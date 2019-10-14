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
                    <h2>Advance Search</h2>
                    Date Range: <input type="date" name="StartDate"/> to <input type="date" name="EndDate"/>

                    <p></p>

                    <select name="Choses">
                        <option value="And">And</option>
                        <option value="Or">Or</option>
                        <option value="And not">And not</option>
                        <option value="Or not">Or not</option>
                    </select>

                    <select name="NameOfField">
                        <option value="Article title">Article title</option>
                        <option value="Article sourse">Article sourse</option>
                        <option value="Author">Author</option>
                    </select>

                    <select name="Operator">
                        <option value="Contains">Contains</option>
                        <option value="Does not contains">Does not contains</option>
                        <option value="Begin with">Begin with</option>
                        <option value="Ends with">Ends with</option>
                        <option value="Is equals to">Is equals to</option>
                        <option value="Is less than">Is less than</option>
                        <option value="More tahn or equal to">More tahn or equal to</option>
                    </select>

                    <input class="" type="text"/>
                    <p>
                    </p>
                        <input type="submit" value="Search" className="btn btn-primary" />
                    </div>
                </form>
            </div>

        )

    }

}
