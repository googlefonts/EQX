import React from 'react';
// import TextField, {HelperText, Input} from '@material/react-text-field';
// import MaterialIcon from '@material/react-material-icon';
// import {Cell, Grid, Row} from '@material/react-layout-grid';
import { CardActionArea, IconButton, CardActions, CardMedia, CircularProgress, Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent, Button, TextField, Fab, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Avatar, AppBar, Tab, Tabs, Card, CardContent, Typography, Box, Divider} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import debounce from 'lodash/debounce';
import axios from 'axios';
import Cookies from "js-cookie";
import getConfig from 'next/config';
import Dropzone from 'react-dropzone';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';

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

class ReferenceImages extends React.Component {

	state = {
		referenceImages: []
	};
	componentDidMount = () => {
		this.autosave = debounce(this.autosave, 500);
		this.update();
	}
	componentDidUpdate(nextProps) {
		if (this.props.test && nextProps.test.questions !== this.props.test.questions) {
			this.update();
		}
	}
	update = () => {
		if (this.props.questionNumber){
			this.setState({referenceImages: this.props.test.questions[Number(this.props.questionNumber - 1)].reference_images });
			console.log(this.props.test.questions[Number(this.props.questionNumber - 1)].reference_images)
		}
	}
	onCaptionChange = (caption, i) => {
		var newReferenceImages = this.state.referenceImages;
		newReferenceImages[i].caption = caption;
		this.setState({referenceImages: newReferenceImages });
		this.autosave(caption, i);
	}

	autosave = (caption, i) => {
		console.log(this.state.referenceImages)
		var newReferenceImages = this.state.referenceImages;
		newReferenceImages[i].caption = caption;
		axios
			.put(apiUrl + '/questions/' + this.props.test.questions[Number(this.props.questionNumber - 1)].id, { 
				reference_images: newReferenceImages,
				}, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
			}).catch(error => { console.log(error); // Handle Error
			}).then(response => { // Handle success
				console.log(response)
			});
	}

	delete = (i) => {
		var newReferenceImages = this.state.referenceImages;
		newReferenceImages.splice(i, 1);
		this.setState({referenceImages: newReferenceImages });
		axios
			.put(apiUrl + '/questions/' + this.props.test.questions[Number(this.props.questionNumber - 1)].id, { 
				reference_images: newReferenceImages,
				}, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
			}).catch(error => { console.log(error); // Handle Error
			}).then(response => { // Handle success
			});
	}

	upload = (files) => {
      var formData = new FormData();
		files.map((file) => {
			formData.append('files', file);
		});
		console.log(this.state.referenceImages)
		axios // Upload new file
			.post(apiUrl + '/upload', formData, 
				{ headers: { 'Authorization': 'Bearer ' + Cookies.get("jwt") } 
			})
			.then(response => { 
				console.log(response.data[0])
				var newImages = this.state.referenceImages;
				response.data.map((image) => {
					newImages.push({image: image});
				});
				console.log(apiUrl + '/questions/' + this.props.test.questions[Number(this.props.questionNumber - 1)].id)
				axios // Save to question
					.put(apiUrl + '/questions/' + this.props.test.questions[Number(this.props.questionNumber - 1)].id, { 
						reference_images: newImages,
					}, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
					}).catch(error => { console.log(error) 
					}).then(response => {
						this.setState({referenceImages: newImages });
					});
			});
     
	}

	render() {
		return (
			<>
				{(this.state.referenceImages && this.state.referenceImages.length) ?

					<Grid container spacing={0} className="reference-images">
						<Grid item xs={12} style={{textAlign: "center"}}>
								{ this.state.referenceImages.map((image, i) =>
									<Box 
										key={"reference-image-" + i} 
										style={{width: "200px", display: "inline-block"}} 
										mb={2} mr={1} ml={1} 
									>
										<Card style={{position: "relative"}} >
											<IconButton 
												onClick={() => {this.delete(i)}} 
												style={{position:"absolute", zIndex: "1", background: "rgba(0,0,0,0.1)", right: "5px", top: "5px", color:"white"}} component="span"
											>
												<DeleteIcon />
											</IconButton>
											<CardActionArea>
												<CardMedia
													style={{width: "100%", height: "120px", }}
													component="img"
													image={(image.image && apiUrl + image.image.url) ? (apiUrl + image.image.url) : ""}
												/>
											</CardActionArea>
											<CardContent>
												<TextField 
													value={image.caption ? image.caption : ""}  
													onChange={e => {this.onCaptionChange(e.currentTarget.value, i)}}
													label="Caption"  
													type="text"  
													fullWidth 
												/>
											</CardContent>
										</Card>
									</Box>
								)}
						</Grid>
					</Grid>
				:
					<></>
				}
				<Grid container spacing={0} className="reference-images-input">
					<Grid item xs={2}></Grid>
					<Grid item xs={8}>
						<Dropzone onDrop={files => this.upload(files)}>
							{({getRootProps, getInputProps}) => (
								<section style={{border: "1px dashed", background: "rgba(0,0,0,0.1)"}}>
									<div {...getRootProps()}>
										<input {...getInputProps()} />
										<Typography variant="h6"><br/>Add reference images.<br/><br/></Typography>
									</div>
								</section>
							)}
						</Dropzone>
					</Grid>
					<Grid item xs={2}></Grid>
				</Grid>
			</>
		)
	}
}
 
class CreateQuestionFields extends React.Component {
	state = {
		questionValue: '',
		contextValue: '',
		focus: false
	};

	componentDidMount = () => {
		this.autosave = debounce(this.autosave, 500);
		this.update();
	}
	
	componentDidUpdate(nextProps) {
		if (nextProps.questionNumber !== this.props.questionNumber || nextProps.test !== this.props.test) {
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
			const question = this.props.test.questions[Number(this.props.questionNumber - 1)];
			// console.log(question)
			let questionValue = "";
			if (question.question){
				questionValue = question.question
				questionValue === "" ? this.setState({focus: false}) : this.setState({focus: true});
			}
			let contextValue = "";
			if (question.context){
				contextValue = question.context
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

	// upload = (e) => {
	// 	console.log(e)
	// }

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
								onFocus={() => this.setState({focus: true})}
								onBlur={() => (this.state.questionValue === "") ? this.setState({focus: false}) : this.setState({focus: true})  }
								InputLabelProps={{ 
									style: {
										fontSize: this.state.focus ? 'inherit' : '2.0243rem',
									}, 
								}} 
								InputProps={{ style: { fontSize: "2.0243rem" } }} 
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
					<ReferenceImages {...this.props}/>
				</Grid>

			</>
		);
	}
}

export default CreateQuestionFields;