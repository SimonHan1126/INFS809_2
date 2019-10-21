import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * Navbar GUI which holds functional components such as create user
 * Created by James Hughes
 * */
export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">SERLER</Link>
                <div id ="navBar" className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/add" className="nav-link">Register User</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Login</Link>
                        </li>

                        <li id="liArticle">
                            {/*<Link to="/articles" className="nav-link">Article</Link>*/}
                        </li>
                        <li id="liSubmit">
                            {/*<Link to="/submission" className="nav-link">Submit</Link>*/}
                        </li>

                        {/* <li className="navbar-item">
                            <Link to="/search" className="nav-link">Search</Link>
                        </li> */}
                        <li className="navbar-item">
                            <Link to="/searchtest" className="nav-link">Search</Link>
                        </li>
                    </ul>
                </div>
            </nav>

        );
    }
}