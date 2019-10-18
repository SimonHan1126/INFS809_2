import React, { Component } from 'react';
import axios from 'axios';

export default class SubmitFile extends Component {

    constructor(props) {

        super(props);

        this.state = {

            file: ''

        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeHandler = e => {

        let files = e.target.files;
        console.log("onChangeHandler 11111 " + files);
        let reader = new FileReader();
        reader.onload = r => {
            console.log("onChangeHandler 2222222 " + r.target.result);
            var fileContent = r.target.result.substring(37,r.target.result.length);
            this.setState({

                file: fileContent,
                loaded: 0

            })
        };
        reader.readAsDataURL(files[0]);
    }

    /**
     * Submit a file to MongoDB
     * Created by James Hughes modified by Simon Han
     */
    onSubmit(e) {

        e.preventDefault();

        axios.post('/articles/post', {
            params: {
                "bibTex" : this.state.file
            }
        })
        .then(function (res) {
            console.log(JSON.stringify(arguments))
            if(res.status === 200)
            {
                console.log(res.data);
                alert("add article successfully");
            }
            else
            {
                console.log("status " + res.status + " error " + res.data.err + " err " + res.err)
            }
        });
    }

    render() {

        return (
            <form onSubmit={this.onSubmit}>
            <div onSubmit={this.onFormSubmit}>
                <h3>Submit bibTeX</h3>
                <input type="file" name="inputFile" onChange={this.onChangeHandler} accept=".bib" />
            </div>
            <div className="form-group">
                <input type="submit" value="Submit" className="btn btn-primary"  />
                </div>
                </form>

        )
    }
}