import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class SubmitFile extends Component {

    constructor(props) {

        super(props);

        this.state = {

            file: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeHandler = e => {

        const element = (<div></div>);
        ReactDOM.render(element, document.getElementById('showArticle'));
        let files = e.target.files;
        let reader = new FileReader();
        reader.onload = r => {
            var fileContent = r.target.result.substring(37,r.target.result.length);
            this.setState({

                file: fileContent,
                loaded: 0

            })
        };
        reader.readAsDataURL(files[0]);
    };

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
            if(res.status === 200)
            {
                console.log(res.data);

                if(!!res.data) {
                    if(!!res.data.err)
                    {
                        alert(res.data.err);
                    }
                    else
                    {
                        alert("add article successfully");
                    }

                    delete res.data.err;
                    delete res.data._id;
                    delete res.data.__v;

                    var articleTagArr = [];
                    for(var i in res.data)
                    {
                        articleTagArr.push( i + ":" + res.data[i]);
                    }

                    var str = articleTagArr.map((item, index) => {
                            return <h3>{item}</h3>
                        });
                    const element = (<div>{str}</div>);
                    ReactDOM.render(element, document.getElementById('showArticle'));
                }
            }
            else
            {
                alert("An error occurred. Please try again later");
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
                <div id="showArticle"></div>
                </div>
                </form>

        )
    }
}