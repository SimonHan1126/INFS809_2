import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

let currentUsername = "";

const defaultBar = () => {
    const element =
        (<ul class="navbar-nav mr-auto">
            <li class="navbar-item">
                <a class="nav-link" href="/add">Register User</a>
            </li>
            <li class="navbar-item">
                <a class="nav-link" href="/user">Login</a>
            </li>
            <li class="navbar-item">
                <a class="nav-link" href="/searchtest">Search</a>
            </li>
        </ul>);
    ReactDOM.render(element, document.getElementById('navBar'));
};

const registerBar = () => {
    const element =
        (<ul class="navbar-nav mr-auto">
            <li class="navbar-item">
                <a class="nav-link" href="/user">Login</a>
            </li>
            <li class="navbar-item">
                <a class="nav-link" href="/searchtest">Search</a>
            </li>
        </ul>);
    ReactDOM.render(element, document.getElementById('navBar'));
};

const loginBar = () => {
    const element =
        (<ul class="navbar-nav mr-auto">
            <li class="navbar-item">
                <a class="nav-link" href="/user">Logout</a>
            </li>
            <li id="liArticle">
                <a class="nav-link" href="/articles">Article</a>
            </li>
            <li id="liSubmit">
                <a class="nav-link" href="/submission">Submit</a>
            </li>
            <li class="navbar-item">
                <a class="nav-link" href="/searchtest">Search</a>
            </li>
        </ul>);

    ReactDOM.render(element, document.getElementById('navBar'));
};

const islogin = (username) => {
    axios.post('/users/islogin', {
            params: {
                username: username
            }
        })
        .then(function (res) {
            var islogin = res.data.islogin || false;
            if(islogin)
            {
                loginBar();
            }
            else
            {
                defaultBar();
            }
        }).catch(function (err) {
        defaultBar();
    });
};

const setCurrentUsername = (username) => {
    console.log("this is setCurrentUsername 111111 " + username)
    currentUsername = username;
    console.log("this is setCurrentUsername 2222222 " + currentUsername);
    console.log("this is setCurrentUsername 3333333 " + getCurrentUsername());
};

const getCurrentUsername = () => {
    return currentUsername;
};


export default {
    defaultBar,
    registerBar,
    loginBar,
    islogin,
    setCurrentUsername,
    getCurrentUsername
}
