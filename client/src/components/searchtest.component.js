import React, { Component } from 'react';
//import { isNullOrUndefined } from 'util';
//import axios from 'axios';
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
          DropDownAndOr: ['And'],
          NameOfField: ['Article title'],
          Operator: ['Contains',],
          Textinput: ['Input',]
    };
    this.handletimeChange = this.handletimeChange.bind(this);
    this.handleEndtimeChange=this.handleEndtimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    // Text add and remove
    addText(){
        this.setState({Textinput: [...this.state.Textinput, ""]})
    }

    handleTextinputChange(e, index){
        //this.state.Textinput[index] = e.target.value
        //this.setState({ Textinput: this.state.Textinput })

        this.setState(state => {

            const list = state.Textinput.push(e.target.value);
            return { list };

        });
    }

    handleTextinputRemove(index){
        //remove an item in index
        this.state.Textinput.splice(index,1)
        console.log(this.state.Textinput, "Textinput Removed");

        //update the state - dont need this when you splice it autoupdates the state
        //this.setState({Textinput: this.state.Textinput})
    }

    //Operater add and remove
    addOperator(){
        this.setState({Operator: [...this.state.Operator, ""]})
    }

    handleOperatorChange(e, indexOperator){
        //this.state.Operator[indexOperator] = e.target.value
        //this.setState({ Operator: this.state.Operator })

        this.setState(state => {

            const list = state.Operator.push(e.target.value);
            return { list };

        });
    }

    handleOperatorRemove(indexOperator){
        this.state.Operator.splice(indexOperator,1)
        console.log(this.state.Operator, "OperatorRemove");
        

        this.setState({Operator: this.state.Operator})
    }

    //DropdownAndOr add and remove 
    addDropDownAndOr(){
        this.setState({DropDownAndOr: [...this.state.DropDownAndOr, ""]})
    }

    handleDropDownAndOrChange(e,indexDropDownAndOr){
        //this.state.DropDownAndOr[indexDropDownAndOr] = e.target.value
        //this.setState({ DropDownAndOr: this.state.DropDownAndOr })

        this.setState(state => {

            const list = state.DropDownAndOr.push(e.taregt.value);
            return { list };

        });
    }

    handleDropDownAndOrRemove(indexDropDownAndOr){
        this.state.DropDownAndOr.splice(indexDropDownAndOr,1)
        console.log(this.state.DropDownAndOr, "DropDownAndOrRemove");

        //update the data
        this.setState({DropDownAndOr: this.state.DropDownAndOr})
    }

    //Name of Field  add and remove
    addNameOfField(){
        this.setState({NameOfField: [...this.state.NameOfField, ""]})
    }

    handleNameOfFieldChange(e,indexNameOfField){
        //this.state.NameOfField[indexNameOfField] = e.target.value
        //this.setState({ NameOfField: this.state.NameOfField })

        this.setState(state => {

            const list = state.NameOfField.push(e.target.value);
            return { list };

        });
    }

    handleNameOfFieldRemove(indexNameOfField){
        this.state.NameOfField.splice(indexNameOfField,1)
        console.log(this.state.NameOfField, "NameOfFiledRemove");

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

                return(
                    <div key={indexNameOfField}>
                        <select name="NameOfField" value={NameOfFieldInfo} onChange={this.handleNameOfFieldChange}>
                            <option value="Article title">Article title</option>
                            <option value="Article sourse">Article sourse</option>
                            <option value="Author">Author</option>
                         </select>
                    </div>
                )
               })
           }
            {/* Drop down of the And and Or select option */}
            {
                this.state.DropDownAndOr.map((DropDownAndOrInfo, indexDropDownAndOr)=>{

                    return(
                        <div key={indexDropDownAndOr}>
                            <select name="DropDownAndOr" value={DropDownAndOrInfo} onChange={(e)=>this.handleDropDownAndOrChange(e,indexDropDownAndOr)}>
                                <option value="And">And</option>
                                <option value="Or">Or</option>
                                <option value="And not">And not</option>
                                <option value="Or not">Or not</option>
                            </select>
                        </div>
                    )
                })
                
            }
            
            {/* The operator select option */}
            {
                this.state.Operator.map((OperatorInfo, indexOperator)=>{

                    return(
                        
                        <div  style={{}} key={indexOperator}>
                            
                            <select  name="Operator" value={OperatorInfo} onChange={(e)=>this.handleOperatorChange(e,indexOperator)}>
                                <option value="Contains">Contains</option>
                                <option value="Does not contains">Does not contains</option>
                                <option value="Begin with">Begin with</option>
                                <option value="Ends with">Ends with</option>
                                <option value="Is equals to">Is equals to</option>
                                <option value="Is less than">Is less than</option>
                                <option value="More than or equal to">More than or equal to</option>
                            </select>
                            
                            {/* <button onClick={()=>this.handleOperatorRemove(indexOperator)}>RemoveOperator</button> 
                                this will create a individual button to remove this function*/}
                        </div>
                        
                    )
                })
            }
            
            {/* <button onClick={(e)=>this.AddGenarl(e)}>addText</button> */}
            {
                this.state.Textinput.map((Text, index)=>{
                    return(
                        <div  key={index}>
                            
                            <input onChange={(e)=>this.handleTextinputChange(e, index)} value={Text} />
                        
                            {/* <button onClick={()=>this.handleTextinputRemove(index)}>RemoveText</button> */}
                        </div>
                    )

                })
            
            }
            
        <button onClick={(e)=>this.AddGenarl(e)}>Add</button>
        <button onClick={(e)=>this.RemoveGenarl(e)}>Remove</button>
          <input type="submit" value="Submit" />
        </form>
       
      );
    }
  }
  