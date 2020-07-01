import React, { Component } from 'react';
import { user as userAPI} from '../../utils/API';
import { Redirect } from 'react-router-dom';
import { Col, Row, Container } from '../../components/Grid';
import { Input, FormBtn } from '../../components/Form';
import Card from '../../components/Card';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.email && this.state.password) {
			console.log(this.state.email);

			// set loading state
			this.props.setLoading(true);

			userAPI
				.login({
					email: this.state.email,
					password: this.state.password
				})
				.then(res => {
					if (res.status === 200) {
						console.log(res.status)
						this.props.setLoading(false);
						this.props.setUser(res.data);
					}
				})
				.catch(err => {
					this.props.setLoading(false);
					
					console.warn(err.response.data)
					this.props.setAlertInfo({ 
						theme:"warning",
						message: err.response.data
					});
				});
		}
	};

	render() {
		return (
			<Container fluid>
				<Row>
					<Col size='12'>
						<Card title='Login'>
							<form>
								<Input
									value={this.state.email}
									onChange={this.handleInputChange}
									name='email'
									placeholder='email (required)'
								/>
								<Input
									value={this.state.password}
									onChange={this.handleInputChange}
									name='password'
									placeholder='(required)'
									type='password'
								/>

								<FormBtn
									disabled={!(this.state.email && this.state.password)}
									onClick={this.handleFormSubmit}
								>
									Log in
								</FormBtn>
							</form>
						</Card>
					</Col>
				</Row>

				{/* Redirect on authentication */}
				{this.props.user && this.props.user._id ? <Redirect to='/home' /> : <></>}
			</Container>
		);
	}
}

export default Login;
