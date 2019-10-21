import React, { Component } from 'react';
//import { isNullOrUndefined } from 'util';
import axios from 'axios';
//import '../App.css';

/**
 * Advance search UI interface with add and remove functions.
 * 
 * Created by Bohan modified by Bohan
 * */

export default class Searchtest extends Component {
    
    constructor(props) {
      super(props);
        this.state = {
          time: '00/00/0000',
          Endtime: '00/00/0000',
          DropDownAndOr: ['and'],
          NameOfField: ['title'],
          Operator: ['Contains'],
            Textinput: ['Input'],
            cQuery: ''
        };

        this.handletimeChange = this.handletimeChange.bind(this);
        this.handleEndtimeChange = this.handleEndtimeChange.bind(this);
        this.handleNameOfFieldChange = this.handleNameOfFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.generateQuery = this.generateQuery.bind(this);
        this.getResults = this.getResults.bind(this);
    }

    /**
     * Creates a query based on UI inputs
     * Created by James Hughes
     * */
    generateQuery = () => {

        let q = [];
        let result = '{i}';
        
        /*
         * $or: [{
                title: { $regex: req.query.title, $options: 'i' },
                author: { $regex: req.query.author, $options: 'i' }
            }]
         */

        //Loop through all arrays and combine them to make a query
        for (var i = 0; i !== this.state.Textinput.length; i++) {

           q[i] = '$' + this.state.DropDownAndOr[i] +
                ': [{i},{' + this.state.NameOfField[i] +
                ': { $regex: ' + this.state.Textinput[i] +
                ' , $options: "i"}}]'
           
        }

        if (q.length > 1) {

            for (var i = 0; i !== q.length; i++) {

                result = result.replace('{i}', q[i])

            }

            console.log("tag33: " + result);
            this.getResults(result);

        } else {

            console.log("tag44: " + q[0]);
            this.getResults(q[0]);
            
        }
        
    }

    /**
     * Gets table body
     * Created by James Hughes
     * */
    getResults = (param) => {

        axios.get('articles/', {
            
            params: {

                customQuery: param

            }
        })
            .then(response => {

                console.log(response)


            })
            .catch(err => {

                console.log(err);

            });

    }
    
    // Text add and remove
    addText(){
        this.setState({Textinput: [...this.state.Textinput, ""]})
    }

    handleTextinputChange(e, index){
        
        let Textinput = [...this.state.Textinput];
        Textinput[index] = e.target.value;
        this.setState({ Textinput });
    }

    handleTextinputRemove(index) {

        let items = this.state.Textinput;
        items.splice(index, 1);
        console.log(this.state.Textinput, "Textinput Removed");
        this.setState({ TextInput: items });

    }

    //Operater add and remove
    addOperator(){
        this.setState({Operator: [...this.state.Operator, "Contains"]})
    }

    handleOperatorChange(e, indexOperator){
       
        let Operator = [...this.state.Operator];
        Operator[indexOperator] = e.target.value;
        this.setState({ Operator });
    }

    handleOperatorRemove(indexOperator){
        this.state.Operator.splice(indexOperator,1)
        console.log(this.state.Operator, "OperatorRemove");
        

        this.setState({Operator: this.state.Operator})
    }

    //DropdownAndOr add and remove 
    addDropDownAndOr(){
        this.setState({DropDownAndOr: [...this.state.DropDownAndOr, "and"]})
    }

    handleDropDownAndOrChange(e,indexDropDownAndOr){

        //We mutate outside of the state then change the value with set state 
        //This adheres to the immutablility of states
        let DropDownAndOr = [...this.state.DropDownAndOr];
        DropDownAndOr[indexDropDownAndOr] = e.target.value;
        this.setState({ DropDownAndOr });

    }

    handleDropDownAndOrRemove(indexDropDownAndOr){
        this.state.DropDownAndOr.splice(indexDropDownAndOr,1)
        console.log(this.state.DropDownAndOr, "DropDownAndOrRemove");

        //update the data
        this.setState({DropDownAndOr: this.state.DropDownAndOr})
    }

    //Name of Field  add and remove
    addNameOfField(){
        this.setState({NameOfField: [...this.state.NameOfField, "title"]})
    }

    handleNameOfFieldChange(e,indexNameOfField){

        let NameOfField = [...this.state.NameOfField];
        NameOfField[indexNameOfField] = e.target.value;
        this.setState({ NameOfField });

    }

    handleNameOfFieldRemove(indexNameOfField){
        this.state.NameOfField.splice(indexNameOfField,1)
        console.log(this.state.NameOfField, "NameOfFieldRemove");

        //update the data
        this.setState({NameOfField: this.state.NameOfField})
    }

    //general several button options
    AddGenarl(){
        this.addNameOfField();
        this.addDropDownAndOr();
        this.addOperator();
        this.addText();

    }

    RemoveGenarl(One){
        this.handleNameOfFieldRemove(One);
        this.handleDropDownAndOrRemove(One);
        this.handleOperatorRemove(One);
        this.handleTextinputRemove(One);
    }

    handletimeChange(e){
        this.setState({time: e.target.value});
    }

    handleEndtimeChange(event){
        this.setState({Endtime: event.target.value});
    }

    handleSubmit(event) {
      console.log('Input test' + this.state.time + ',' + this.state.Endtime +this.state.DropDownAndOr + this.state.NameOfField + this.state.Operator
      + this.state.Textinput);
      event.preventDefault();
    }
    
    render() {
      return (
          
          
        <form onSubmit={this.handleSubmit}>
            {/* EndDate value need consider no more than today*/}
            Date Range: <input type="date" name="StartDate" value={this.state.time} onChange={this.handletimeChange}/> to 
            <input type="date" name="EndDate" value={this.state.Endtime} onChange={this.handleEndtimeChange}/>
            <p></p>
          
              {/* name of filed select options  */}
              
           {
               this.state.NameOfField.map((NameOfFieldInfo, indexNameOfField)=>{

                   return (
                       //<div className={indexNameOfField}>
                       <select name="NameOfField" value={NameOfFieldInfo} onChange={(e) => this.handleNameOfFieldChange(e, indexNameOfField)} key={indexNameOfField}>
                            <option value="title">Article title</option>
                            <option value="journal">Article source</option>
                            <option value="author">Author</option>
                         </select>
                    //</div>
                )
               })
           }
            {/* Drop down of the And and Or select option */}
            {
                this.state.DropDownAndOr.map((DropDownAndOrInfo, indexDropDownAndOr)=>{
                   
                    return (
                        //<div className={indexDropDownAndOr}>
                        <select name="DropDownAndOr" value={DropDownAndOrInfo} onChange={(e) => this.handleDropDownAndOrChange(e, indexDropDownAndOr)} key={indexDropDownAndOr}>
                                <option value="and">And</option>
                                <option value="or">Or</option>
                                <option value="not">And not</option>
                                <option value="nor">Or not</option>
                            </select>
                        //</div>
                    )
                })
                
            }
            
            {/* The operator select option */}
            {
                this.state.Operator.map((OperatorInfo, indexOperator)=>{

                    return(
                        
                        //<div className={indexOperator}>
                            
                        <select name="Operator" value={OperatorInfo} onChange={(e) => this.handleOperatorChange(e, indexOperator)} key={indexOperator}>
                                <option value="Contains">Contains</option>
                                <option value="Does not contains">Does not contains</option>
                                <option value="Begin with">Begin with</option>
                                <option value="Ends with">Ends with</option>
                                <option value="Is equals to">Is equals to</option>
                                <option value="Is less than">Is less than</option>
                                <option value="More than or equal to">More than or equal to</option>
                            </select>
                            
                           
                        //</div>
                        
                    )
                })
            }
            
            {/* <button onClick={(e)=>this.AddGenarl(e)}>addText</button> */}
            {
                this.state.Textinput.map((Text, index)=>{
                    return(
                        <div  className={index} className="input-group">

                            <input type="search" onChange={(e) => this.handleTextinputChange(e, index)} value={Text} />
                            
                                <button onClick={() => this.handleTextinputRemove(index)} className="button">Remove Text</button>
                            
                        </div>
                    )

                })
            
            }
            
        <button onClick={(e)=>this.AddGenarl(e)}>Add</button>
              <button onClick={(e) => this.RemoveGenarl(e)}>Remove</button>
              <input type="submit" value="Submit" onClick={() => this.getResults()} />
        </form>
       
      );
    }
  }
  