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

        
        this.state = {

            search: [],
            specSearch: ''

        };
        this.onSubmit = this.onSubmit.bind(this);

    }

    /**
     * Preloads data tables so the user is always presented with data
     **/
    componentDidMount() {

            axios.get('http://localhost:5000/articles/')
                .then(response => {

                    this.setState({ search: response.data })
                    console.log("Made it");

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

            //For every article in the list return a component in the table
            return this.state.search.map(currentArticle => {
                return <Ele article={currentArticle} key={currentArticle._id} />;
            }); 

    }

    
    /**
     * What to do when button 'Search' is pressed
     * Created by James Hughes
     */
    onSubmit(e) {

        e.preventDefault();
        console.log("f: " + this.state.specSearch);
        axios.get('/')
            .then(response => {

                this.setState({

                    search: this.state.search.filter(t => t.title === this.state.specSearch)

                })
            })
            .catch((error) => {

                console.log(error);

            });
    }

    updateSearchValue(e) {

        this.setState({ specSearch: e.target.value })
        console.log("B :" + this.state.specSearch);

    }

    render() {

        return (

            <div>
                <h3>Articles</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.specSearch}
                            onChange={e => this.updateSearchValue(e)}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Search" className="btn btn-primary" />
                    </div>
                    </form>
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
