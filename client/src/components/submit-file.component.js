import React, { Component } from 'react';

const Cite = require('citation-js');

// Set variables
let example = new Cite('Q21972834');

let output = example.format('bibliography', {
    format: 'html',
    template: 'apa',
    lang: 'en-US'
});
    

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

        console.log(e.target.files[0])
        console.log(output);
        this.setState({

            file: e.target.files[0],
            loaded: 0

        })
    }

    /**
     * Submit a file to MongoDB
     * Created by James Hughes
     */
    onSubmit(e) {

        e.preventDefault();
        console.log(this.state.file);

    }

    render() {

        return (
            <form onSubmit={this.onSubmit}>
            <div onSubmit={this.onFormSubmit}>
                <h3>Submit bibTeX</h3>
                <input type="file" name="inputFile" onChange={this.onChangeHandler} />
            </div>
            <div className="form-group">
                <input type="submit" value="Submit" className="btn btn-primary" />
                </div>
                </form>

        )
    }
}