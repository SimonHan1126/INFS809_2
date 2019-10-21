import React, { Component } from 'react';
import axios from 'axios';
import userUtil from "../util/userUtil"

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
            specSearch: '',
            used: false

        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);

    }

    /**
     * Preloads data tables so the user is always presented with data
     **/
    componentDidMount() {

        this.updateList();
        userUtil.loginBar();
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
        this.updateList();
    }

    /**
     * Function to update the state of the list based on the type of search
     * Created by James Hughes
     * */
    updateList() {

        if (!this.state.used) {

            axios.get('http://localhost:5000/articles/', {
                params: {

                    title: this.state.specSearch,
                    author: ''
                }

            })
                .then(response => {

                    this.setState({
                        search: response.data,
                        used: true
                    })

                })
                .catch((error) => {

                    console.log(error);

                });

        } else {

            axios.get('http://localhost:5000/articles/', {
                params: {

                    title: this.state.specSearch,
                    author: ''

                }
                })
                .then(response => {
                    this.setState({

                        search: response.data,
                        used: true

                    })
                })
                .catch((error) => {

                    console.log(error);

                });
        }
    }

    /**
     * Updates the search parameters 
     * Created by James Hughes
     */
    updateSearchValue(e) {

        this.setState({ specSearch: e.target.value })

    }

    onClick() {

        axios.get('http://localhost:5000/articles/', {
            params: {

                title: this.state.specSearch,
                author: ''

            }
        })
            .then(response => {

                console.log(this.state.specSearch)
                console.log(response)
             

            })
            .catch(err => {

                console.log(err);

            });

    }

    render() {

        return (

            <div>
                <h3>Articles</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                        <input type="search"
                            required
                            className="form-control"
                            value={this.state.specSearch}
                            onChange={e => this.updateSearchValue(e)}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Search" className="btn btn-primary" />
                    </div>
                    <div>
                        <input type="submit" value="test query" className="btn btn-primary" onClick={this.onClick} />
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
