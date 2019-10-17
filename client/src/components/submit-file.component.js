import React, { Component } from 'react';

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
        var CircularJSON = require('circular-json');
        console.log("here: " + CircularJSON.stringify(this.state.file));


        //const Cite = require('citation-js'); 
        //let art = new Cite(this.state.file);
        //let output = art.format('bibliography', {

            //format: 'HTML',
            //template: 'CSL-JSON',
            //lang: 'en-US'

        //})
        //console.log(output);
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