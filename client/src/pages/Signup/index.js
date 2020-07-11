import React, { Component } from 'react';
import styles from './style.module.css';
import { user as userAPI } from '../../utils/API';
import { Redirect } from 'react-router-dom';
import { Col, Row, Container } from '../../components/Grid';
import { Input, FormBtn } from '../../components/Form';
import Card from '../../components/Card';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			username: '',
			password: '',
			passwordConf: ''
		};
	}

	componentDidMount() {}

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		this.props.setLoading(true);
    
    // validate all fields
    if (!this.state.email || !this.state.password || !this.state.passwordConf) {
		  this.props.setLoading(false);
      // set error alert to user
      return this.props.setAlertInfo({theme:"warning", message:"Please fill all required fields"})
    }

    // validate pass === to pass confirmation.
    if(this.state.password.trim() !== this.state.passwordConf.trim()) {
		  this.props.setLoading(false);
      // set error alert to user
      return this.props.setAlertInfo({theme:"warning", message:"Your password fields do not match."})
    }

    // if good to go
		userAPI
				.signup({
					firstname: this.state.username.trim(),
					email: this.state.email.trim(),
					password: this.state.password.trim(),
					passwordConf: this.state.passwordConf.trim()
				})
				.then(res => {
					console.log(res);
					if (res.status === 200) {
            this.props.setUser(res.data);
            console.log(this.props.user)
						this.props.setLoading(false);
						return <Redirect to='/home' />;
					} else {
						this.props.setLoading(false);
						this.props.setAlertInfo({
							theme: 'warning',
							message: JSON.stringify(res.data)
						});
					}
				})
				.catch(err => {
					this.props.setLoading(false);
					console.log(err.response.data);
					this.props.setAlertInfo({ theme: 'warning', message: JSON.stringify(err.response.data) });
				});
	};

	render() {
		return (
			<Container fluid>
				<Row>
					<Col size='12'>
						<br></br>
						<center><h1>Financial data for everyone</h1></center>
						<br></br>
						<center>Look up information with <b>Edward</b> to help you make more informed decisions with your portfolio.</center>
						<br></br>
						<center><b>Sign up!</b></center>
						<center><b>It’s quick and easy.</b></center>
						<Card title='Create Your Account'>
							<form className={styles.form} onSubmit={this.handleFormSubmit}>
								<Input
									value={this.state.username}
									onChange={this.handleInputChange}
									name='username'
									placeholder='Username (Required)'
								/>
								<Input
									value={this.state.email}
									onChange={this.handleInputChange}
									name='email'
									placeholder='Email (Required)'
								/>
								<Input
									value={this.state.password}
									onChange={this.handleInputChange}
									name='password'
									placeholder='Password (Required)'
									type='password'
								/>
								<Input
									value={this.state.passwordConf}
									onChange={this.handleInputChange}
									name='passwordConf'
									placeholder='Retype Password (Required)'
									type='password'
								/>

								<FormBtn
									disabled={!(this.state.email && this.state.password && this.state.passwordConf)}
									theme='dark'
								>
									Sign Up
								</FormBtn>
							</form>
						</Card>
						<br></br>
						<br></br>
					</Col>
				</Row>
				{/* redirect on authenticated */}
        { this.props.user && this.props.user._id 
          ?  <Redirect to='/home' /> 
          :  <div></div> }
			</Container>
		);
	}
}

export default Signup;
