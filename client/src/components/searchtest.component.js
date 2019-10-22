import React, { Component } from 'react';
//import { isNullOrUndefined } from 'util';
import axios from 'axios';
import ReactDOM from 'react-dom';
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
            Textinput: [],
            count: 0
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
     * Created by James Hughes modified by Simon
     * */
    generateQuery = () => {

        let q = [];

        let result = {};

        /*
         * $or: [{
         title: { $regex: req.query.title, $options: 'i' },
         author: { $regex: req.query.author, $options: 'i' }
         }]
         */

        //Loop through all arrays and combine them to make a query
        for (var i = 0; i !== this.state.Textinput.length; i++) {

            var itemRegex = {};
            // {"$and": [{"title" : {"$regex" : "Pattern","$options" :"i"}}]}
            itemRegex[this.state.NameOfField[i]] ={"$regex" : this.state.Textinput[i], "$options" : "i"} ;
            var key = "$" + this.state.DropDownAndOr[i];
            result[key]=  result[key] || [];
            result[key].push(itemRegex);
        }

        if(!!this.state.time && !! this.state.Endtime)
        {
            // var startTimeDate = new Date(Date.parse(this.state.time));
            // var endTimeDate = new Date(Date.parse(this.state.Endtime));
            var startTimeDate = new Date(this.state.time);
            var endTimeDate = new Date(this.state.Endtime);
            if(startTimeDate < endTimeDate)
            {
                var yearItemRegex ={ "year": { "$gte": startTimeDate.getFullYear() ,"$lte": endTimeDate.getFullYear() } } ;
                result["$and"] = result["$and"] || [];
                result["$and"].push(yearItemRegex);
            }
        }

        console.log("q.length " + q.length + " Textinput " + JSON.stringify(this.state.Textinput) + " NameOfField " + JSON.stringify(this.state.NameOfField) + " DropDownAndOr " +JSON.stringify(this.state.DropDownAndOr) + " q " + JSON.stringify(result));

        this.getResults(result);
    };

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

                console.log(response.data)
                // var htmlArray = [];
                var itemTypeArray = [];
                var itemTypeObj = {};

                var itemValueTRArray = [];
                var resultData = response.data || [];
                console.log(JSON.stringify(resultData) + " length " + resultData.length);
                for(var resultDataKey in resultData)
                {
                    var itemData = resultData[resultDataKey];
                    delete itemData._id;
                    delete itemData.createdAt;
                    delete itemData.updatedAt;
                    delete itemData.__v;
                    console.log(JSON.stringify(itemData) + " " + resultDataKey);
                    var itemValueTDArray = [];
                    for(var itemDatakey in itemData)
                    {
                        itemTypeObj[itemDatakey] = <th>{itemDatakey}</th>;
                        // itemTypeArray.push(<th>{itemDatakey}</th>)
                        itemValueTDArray.push(<td>{itemData[itemDatakey]}</td>);
                    }

                    itemValueTRArray.push(<tr>{itemValueTDArray}</tr>);
                }
                console.log("itemValueTRArray " + JSON.stringify(itemValueTRArray));
                for(var i in itemTypeObj)
                {
                    itemTypeArray.push(itemTypeObj[i]);
                }

                var htmlTag = <table class="table">
                    <thead class="thead_light">
                    <tr>
                        {itemTypeArray}
                    </tr>
                    </thead>
                    <tbody>
                        {itemValueTRArray}
                    </tbody>
                </table>

                ReactDOM.render(htmlTag, document.getElementById('resultDiv'));

            })
            .catch(err => {

                console.log(err);

            });

    }

    // Text add and remove
    addText(){
        console.log("addText Textinput 11111 " + JSON.stringify(this.state.Textinput));
        this.setState({Textinput: [...this.state.Textinput, ""]})
        console.log("addText Textinput 22222 " + JSON.stringify(this.state.Textinput));
    }

    handleTextinputChange(e, index){
        index--;
        console.log("addText handleTextinputChange 11111 " + JSON.stringify(this.state.Textinput) + " index " + index + " e.target " + e.target.value);
        let Textinput = [...this.state.Textinput];
        console.log("addText handleTextinputChange 22222 " + JSON.stringify(this.state.Textinput) + " Textinput " + JSON.stringify(Textinput));
        Textinput[index] = e.target.value;
        console.log("addText handleTextinputChange 33333 " + JSON.stringify(this.state.Textinput) + " Textinput " + JSON.stringify(Textinput));
        this.setState({ Textinput });
        console.log("addText handleTextinputChange 44444 " + JSON.stringify(this.state.Textinput) + " Textinput " + JSON.stringify(Textinput));
    }

    handleTextinputRemove(index) {

        let items = this.state.Textinput;
        items.splice(index, 1);
        console.log(this.state.Textinput, "Textinput Removed");
        this.setState({ TextInput: items });
        console.log("addText handleTextinputRemove 111111 " + JSON.stringify(this.state.Textinput));

    }

    //Operater add and remove
    addOperator(){
        this.setState({Operator: [...this.state.Operator, "Contains"]})
    }

    handleOperatorChange(e, indexOperator){
        indexOperator--;
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
        indexDropDownAndOr--;
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
        indexNameOfField--;
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

    ColumnManage(isAdd) {

        var localCount = this.state.count;
        if(!!isAdd)
        {
            //
            localCount++;
        }
        else
        {
            localCount--;
            if(localCount <= 0)
            {
                localCount = 1;
            }
        }

        this.setState({ count: localCount });
        let arr = [];

        for (var index = 0; index < localCount; index++) {
            let optionHtmlTag = <div>
                {/*<div key={index}>*/}
                <select name="NameOfField" value={this.state.NameOfField[index]} onChange={(e)=>this.handleNameOfFieldChange(e,index)}>
                    <option value="title">Article title</option>
                    <option value="journal">Article sourse</option>
                    <option value="author">Author</option>
                </select>
                {/*</div>*/}

                {/*<div key={index}>*/}
                <select name="DropDownAndOr" value={this.state.DropDownAndOr[index]} onChange={(e)=>this.handleDropDownAndOrChange(e,index)}>
                    <option value="and">And</option>
                    <option value="or">Or</option>
                    <option value="not">Not</option>
                    <option value="nor">Nor</option>
                </select>
                {/*</div>*/}

                {/*<div  style={{}} key={index}>*/}

                <select  name="Operator" value={this.state.Operator[index]} onChange={(e)=>this.handleOperatorChange(e,index)}>
                    <option value="Contains">Contains</option>
                    <option value="Does not contains">Does not contains</option>
                    <option value="Begin with">Begin with</option>
                    <option value="Ends with">Ends with</option>
                    <option value="Is equals to">Is equals to</option>
                    <option value="Is less than">Is less than</option>
                    <option value="More than or equal to">More than or equal to</option>
                </select>

                {/*</div>*/}

                <div  className={index} >
                    {console.log("*******************************************index 1111 " + index)}
                    <input type="search" onChange={(e) => this.handleTextinputChange(e, index)}  />
                    {console.log("*******************************************index 2222 " + index)}
                    <button onClick={() => this.handleTextinputRemove(index)} className="button">Remove Text</button>
                </div>
            </div>
            arr.push(optionHtmlTag);

        }

        var str = arr.map((item, index) => {

            return <div>{item}</div>
        })
        // console.log(JSON.stringify(arr));
        const element = (<div>{str}</div>);
        ReactDOM.render(element, document.getElementById('optionDIV'));
    }

    //general several button options
    AddGenarl() {


        this.addNameOfField();
        this.addDropDownAndOr();
        this.addOperator();
        this.addText();
        this.ColumnManage(true);
    }

    RemoveGenarl(One){
        this.handleNameOfFieldRemove(One);
        this.handleDropDownAndOrRemove(One);
        this.handleOperatorRemove(One);
        this.handleTextinputRemove(One);
        this.ColumnManage(false);
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

    componentDidMount() {
        this.ColumnManage(true);
    }

    render() {
        return (


            <form onSubmit={this.handleSubmit}>
                {/* EndDate value need consider no more than today*/}
                Date Range: <input type="date" name="StartDate" value={this.state.time} onChange={this.handletimeChange}/> to
                <input type="date" name="EndDate" value={this.state.Endtime} onChange={this.handleEndtimeChange}/>
                <p></p>
                <div id="optionDIV">

                </div>
                <button onClick={(e)=>this.AddGenarl(e)}>Add</button>
                <button onClick={(e) => this.RemoveGenarl(e)}>Remove</button>
                <input type="submit" value="Submit" onClick={() => this.generateQuery()} />
                <div id="resultDiv">


                </div>
            </form>

        );
    }
}