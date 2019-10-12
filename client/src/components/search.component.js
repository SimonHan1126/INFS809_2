import React, { Component } from 'react';
import axios from 'axios';

export default class Table extends React.Component{
	constructor(props){
		super(props);
		this.getHeader = this.getHeader.bind(this);
		this.getRowsData = this.getRowsData.bind(this);
		this.getKeys = this.getKeys.bind(this);
		this.state = {data: [{'status':'loading'}], search: ""};
	}
	
	getKeys = function(){
		return Object.keys(this.state.data[0]);
	}
	
	getHeader = function(){
		var keys = this.getKeys();
		return keys.map((key, index)=>{
			return <th key={key}>{key.toUpperCase()}</th>
	})
	}
	
	getRowsData = function(){
		var items = this.state.data;
		var keys = this.getKeys();
		return items.map((row, index)=>{
			return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
		})
	}
	
	componentDidMount(){
		this.getNewData();
	}
	
	quantityChange = (event)=>{
		this.setState({search: event.target.value});
	}
	
	getNewData = ()=>{
		axios.get(`/articles/search/query=${this.state.search}`)
			.then(response=>{
				this.setState({data: response.data['results']})
			})
			.catch((error)=>{
				console.log(error);
			});
	}
	
	render(){
		return(
			<div>
				<div>
					FullTextSearch: <input type="text" name="search" placeHolder="" value={this.state.search} onChange={this.quantityChange} />
					<button type="button" onClick={this.getNewData}>Search</button>
				</div>
				<table>
					<thead>
						<tr>{this.getHeader()}</tr>
					</thead>
					<tbody>
						{this.getRowsData()}
					</tbody>
				</table>
			</div>
		);
	}
}

const RenderRow = (props) => {
	return props.keys.map((key, index)=>{
		return <td key={props.data[key]}>{props.data[key]}</td>
	})
}
