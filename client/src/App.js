import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";
import LoginUser from "./components/login-user.component";
import RepositoryList from "./components/repository.component";
import SubmitFile from "./components/submit-file.component";

function App() {
    return (
        <Router>
            <Navbar />
            <br />
            <Route path="/add" component={CreateUser} />
            <Route path="/user" component={LoginUser} />
            <Route path="/articles" component={RepositoryList} />
            <Route path="/submission" component={SubmitFile} />
      </Router>
  );
}

export default App;
