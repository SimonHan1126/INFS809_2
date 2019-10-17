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
          time: '00/00/0000',
          Endtime: '00/00/0000',
          DropDownAndOr: 'And',
          NameOfField: 'Article title',
          Operator: 'Contains',
          Textinput:'Input'
    };
    this.handletimeChange = this.handletimeChange.bind(this);
    this.handleEndtimeChange=this.handleEndtimeChange.bind(this);
    this.handleDropDownAndOrChange = this.handleDropDownAndOrChange.bind(this);
    this.handleNameOfFieldChange = this.handleNameOfFieldChange.bind(this);  
    this.handleOperatorChange = this.handleOperatorChange.bind(this);
    this.handleTextinputChange = this.handleTextinputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handletimeChange(e){
        this.setState({time: e.target.value});
    }
    handleEndtimeChange(event){
        this.setState({Endtime: event.target.value});
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
      //alert('Input test' + this.state.time + this.state.Endtime +this.state.DropDownAndOr + this.state.NameOfField + this.state.Operator
      //+ this.state.Textinput);
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
            Date Range: <input type="date" name="StartDate" value={this.state.time} onChange={this.handletimeChange}/> to 
            <input type="date" name="EndDate" value={this.state.Endtime} onChange={this.handleEndtimeChange}/>
            <p></p>
          <label>
            
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
            <input type="text" value={this.state.Textinput} onChange={this.handleTextinputChange}/>
          </label>
           



          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
  