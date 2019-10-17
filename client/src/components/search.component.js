import React, { Component } from 'react';
import axios from 'axios';

/**
 * Created by Simon
 * */
export default class Search extends Component {
    constructor(props) {

        super(props);

        this.state = {

            search: ''

        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onAlterText = this.onAlterText.bind(this);
    }

    componentDidMount() {

        console.log(this.state.search);

    }

    onAlterText(e) {

        this.setState({ search: e.target.value });
        console.log("pie" + this.state.search);

    }

    onSubmit(e) {

        e.preventDefault();
        axios.get('/', {
            params: {

                title: this.state.search

            }})
            .then(response => {

                console.log("result: " + response);

            })
            .catch(err => {

                console.log("error" + err);

            });



        /*
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
            */
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
                        <option value="0">And</option>
                        <option value="1">Or</option>
                        <option value="2 not">And not</option>
                        <option value="3">Or not</option>
                    </select>

                    <select name="NameOfField">
                        <option value="0">Article title</option>
                        <option value="1">Article sourse</option>
                        <option value="2">Author</option>
                    </select>

                    <select name="Operator">
                        <option value="0">Contains</option>
                        <option value="1">Does not contains</option>
                        <option value="2">Begin with</option>
                        <option value="3">Ends with</option>
                        <option value="4">Is equals to</option>
                        <option value="5">Is less than</option>
                        <option value="More than or equal to">More tahn or equal to</option>
                    </select>

                        <input name="txtinput"
                            type="search"
                            className="form-control"
                            onChange={e => this.onAlterText(e)} />
                    <p>
                    </p>
                        <input type="submit" value="Search" className="btn btn-primary" />
                    </div>
                </form>
            </div>

        )

    }

}
