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
                <Link to="/" className="navbar-brand">SERLER"</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/add" className="nav-link">Register User</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Login</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/articles" className="nav-link">Articles</Link>
                        </li>
                    </ul>
                </div>
            </nav>

        );
    }
}