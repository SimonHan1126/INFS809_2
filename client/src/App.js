import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Navbar from "./components/navbar.component";
import Table from "./components/search.component";

function App() {
    return (
        <Router>
            <Navbar />
            <Table />
      </Router>
  );
}

export default App;
