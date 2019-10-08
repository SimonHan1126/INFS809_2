import React, { Component } from 'react';
import axios from 'axios';

/**
 * This represents a single row in a table used in mapping 
 * Created by James Hughes
 */
const Ele = props => (

    <tr>
        <td>{props.article.title}</td>
        <td>{props.article.author}</td>
        <td>{props.article.doi}</td>
        <td>{props.article.journal}</td>
        <td>{props.article.month}</td>
        <td>{props.article.year}</td>
        <td>{props.article.type}</td>
    </tr>

)

/**
 * GUI for the repository after logging in
 * Created by James Hughes
 */
export default class RepositoryList extends Component {

    constructor(props) {

        super(props);

        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.state = {

            search: []

        };

    }

    onChangeSearch(e) {

        this.setState({
            //search: e.target.value
        });

    }

    onSubmit(e) {

        e.preventDefault();
        axios.get('/')
            .then(res => console.log(res.data));

    }

    /**
     * Preloads data tables so the user is always presented with data
     **/
    componentDidMount() {

        axios.get('http://localhost:5000/articles/')
            .then(response => {

                this.setState({ search: response.data })

            })
            .catch((error) => {

                console.log(error);

            });

    }

    /**
     * This searches result from MongoDB iterating through the array and displaying resulst in a table body
     * Created by James Hughes
     * */
    articlesList() {

        return this.state.search.map(currentArticle => {
            return <Ele article={currentArticle} key={currentArticle._id} />;
        })

    }

    render() {

        return (

            <div>
                <h3>Articles</h3>
                <div className="form-group">
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.value}
                        onChange={this.onChangeSearch}
                    />
                    <input type="submit" value="Search" className="btn btn-primary"/>
                    </div>
                <table className="table">
                    <thead className="thead_light">
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Doi</th>
                            <th>Journal</th>
                            <th>Month</th>
                            <th>Year</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.articlesList()}
                    </tbody>
                </table>
            </div>
            
            )

    }
}
