import React from 'react';
// import TextField, {HelperText, Input} from '@material/react-text-field';
// import MaterialIcon from '@material/react-material-icon';
// import {Cell, Grid, Row} from '@material/react-layout-grid';
import { CircularProgress, Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent, Button, TextField, Fab, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Avatar, AppBar, Tab, Tabs, Card, CardContent, Typography, Box, Divider} from '@material-ui/core';
import debounce from 'lodash/debounce';
import axios from 'axios';
import Cookies from "js-cookie";

// class Table extends React.Component {
// 	constructor (props) {
// 		super(props)
// 		this.state = { searchTerm: props.searchTerm }
// 	}

// 	setSearchTerm = debounce(searchTerm => {
// 		this.setState({ searchTerm })
// 	}, 1000)

// 	render() {
// 		return (
// 			<div className="widget">
// 				<p>{this.state.searchTerm}</p>
// 				<input onChange={e => {this.setSearchTerm(e.target.value)}} />
// 			</div>
// 		)
// 	}
// }

import {DropzoneArea} from 'material-ui-dropzone'
 
// class DropzoneAreaExample extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       files: []
//     };
//   }
//   handleChange(files){
//     this.setState({
//       files: files
//     });
//   }
//   render(){
//     return (
//       <DropzoneArea onChange={this.handleChange.bind(this)} />
//     )
//   }
// }
 
// export default DropzoneAreaExample;

class CreateQuestionFields extends React.Component {
	state = {
		questionValue: '',
		contextValue: ''
	};

	componentDidMount = () => {
		this.autosave = debounce(this.autosave, 500);
		this.update();
	}
	
	componentDidUpdate(nextProps) {
		if (nextProps.questionNumber !== this.props.questionNumber ||
			nextProps.test !== this.props.test) {
			this.update();
		}
	}

	autosave = () => {
		axios
		  .put(apiUrl + '/questions/' + this.props.test.questions[Number(this.props.questionNumber - 1)].id, {
		    question: this.state.questionValue,
			 context: this.state.contextValue
		  }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
		  }).catch(error => { console.log(error); // Handle Error
		  }).then(response => { // Handle success
		    // Router.push("/create-question?test=" + this.props.test.id + "&question=" + (this.props.test.questions.length + 2))
		  });
	}

	update = () => { 
		if (
			this.props.questionNumber && 
			typeof this.props.test != "undefined" && 
			Object.keys(this.props.test).length > 0
		){
			// console.log(this.props.test.questions[Number(this.props.questionNumber - 1)])
			let questionValue = "";
			if (this.props.test.questions[Number(this.props.questionNumber - 1)].question){
				questionValue = this.props.test.questions[Number(this.props.questionNumber - 1)].question
			}
			let contextValue = "";
			if (this.props.test.questions[Number(this.props.questionNumber - 1)].context){
				contextValue = this.props.test.questions[Number(this.props.questionNumber - 1)].context
			}
			this.setState({
				questionValue:  questionValue,
				contextValue:   contextValue
			})
		}
	}

	onQuestionChange = (e) => {
		this.setState({questionValue: e})
		this.autosave();
	}

	onContextChange = (e) => {
		this.setState({contextValue: e})
		this.autosave();
	}

	render() {
		return (
			<>
				<Grid container spacing={0} className="create-question-fields">
					<Grid item xs={2}></Grid>
					<Grid item xs={8}>
						<Box mb={2}>
							<TextField 
								value={this.state.questionValue}  
								onChange={e => {this.onQuestionChange(e.currentTarget.value)}}
								autoFocus  
								multiline
								label="Question"  
								type="text"  
								variant="filled"
								fullWidth 
							/>
						</Box>
					</Grid>
					<Grid item xs={2}></Grid>
				</Grid>

				<Grid container spacing={0} className="create-question-fields">
					<Grid item xs={2}></Grid>
					<Grid item xs={8}>
						<Box mb={2}>
							<TextField 
								value={this.state.contextValue}  
								onChange={e => {this.onContextChange(e.currentTarget.value)}}
								autoFocus  
								multiline
								label="Question's context"  
								type="text"  
								variant="filled"
								fullWidth 
							/>
						</Box>
					</Grid>
					<Grid item xs={2}></Grid>
				</Grid>

				{/* <Grid container spacing={0} className="create-question-fields">
					<Grid item xs={12}>
						<DropzoneArea onChange={this.handleChange.bind(this)} />
					</Grid>
				</Grid> */}
			</>
		);
	}
}

export default CreateQuestionFields;