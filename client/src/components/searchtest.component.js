import React, { Component } from 'react';
//import axios from 'axios';


/**
 * User view of registration page, enables functions through GUI interactions
 * Created by Bohan modified by Bohan
 * */

export default class Searchtest extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
          DropDownAndOr: ' ',
          NameOfField: ' ',
          Operator: ' ',
          Textinput:' '
    };
    
    this.handleDropDownAndOrChange = this.handleDropDownAndOrChange.bind(this);
    this.handleNameOfFieldChange = this.handleNameOfFieldChange.bind(this);  
    this.handleOperatorChange = this.handleOperatorChange.bind(this);
    this.handleTextinputChange = this.handleTextinputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
  

    handleDropDownAndOrChange(event){
        
        this.setState({DropDownAndOr: event.target.value});
    }

    handleNameOfFieldChange(event){
        this.setState({NameOfField: event.target.value});
    }

    handleOperatorChange(event){
        this.setState({Operator: event.target.value});
    }

    handleTextinputChange(event){
        this.setState({Textinput: event.target.value});
    }

    handleSubmit(event) {
      alert('Input test' + this.state.DropDownAndOr + this.state.NameOfField + this.state.Textinput);
      event.preventDefault();
    }

    //this kind of writing style may use less coding...
    // handleDropDownAndOr = event =>{
    //     this.setDropDownAndOr({value: event.target.value});
    // }

    // handleNameOfField = event =>{
    //     this.setNameOfField({value: event.target.value});
    // }

    // handleTextinput = event =>{
    //     this.setTextinput({value: event.trget.value});
    // }

    // handleOperator = event =>{
    //     this.setOperator({value: event.target.value});
    // }
  
    render() {
      return (
          
        <form onSubmit={this.handleSubmit}>
            {/* Date value need consider */}
            Date Range: <input type="date" name="StartDate"/> to <input type="date" name="EndDate"/>
          <label>
            Pick your favorite flavor:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
            {/* This is the DropDownAndOr select option */}

            <select name="DropDownAndOr" value={this.state.DropDownAndOr} onChange={this.handleDropDownAndOrChange}>
                <option value="And">And</option>
                <option value="Or">Or</option>
                <option value="And not">And not</option>
                <option value="Or not">Or not</option>
            </select>

            {/* The NameOfField dropdown option */}
            <select name="NameOfField" value={this.state.NameOfField} onChange={this.handleNameOfFieldChange}>
                <option value="Article title">Article title</option>
                <option value="Article sourse">Article sourse</option>
                <option value="Author">Author</option>
            </select>
            {/* The operator dropdown option */}
            <select name="Operator" value={this.state.Operator} onChange={this.handleOperatorChange}>
                <option value="Contains">Contains</option>
                <option value="Does not contains">Does not contains</option>
                <option value="Begin with">Begin with</option>
                <option value="Ends with">Ends with</option>
                <option value="Is equals to">Is equals to</option>
                <option value="Is less than">Is less than</option>
                <option value="More than or equal to">More than or equal to</option>
            </select>

            
          </label>
           

            {/* <input class="" type="text"/> */}

          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
  


