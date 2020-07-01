import React, { Component } from "react";
import styles from "./style.module.css";
import { user as userAPI} from "../../utils/API";
import { Redirect } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import Card from "../../components/Card";

class Signup extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    passwordConf: ""
  };

  componentDidMount() {
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
      userAPI.signup({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        passwordConf: this.state.passwordConf,

      })
        .then(res => {
          if(res.status === 200 ){
            this.props.authenticate();
            return <Redirect to="/books" />
          }
        })
        .catch(err => {console.log(err)});
    }
  };

  render() {
    return (
      <Card><Container fluid>
        <Row>
          <Col size="12">
 
            <form className={styles.form}>
              <Input
                value={this.state.username}
                onChange={this.handleInputChange}
                name="username"
                placeholder="username (required)"
              />
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="email (required)"
              />
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="(required)"
                type="password"
              />
              <Input
                value={this.state.passwordConf}
                onChange={this.handleInputChange}
                name="passwordConf"
                placeholder="(required)"
                type="password"
              />
              
              <FormBtn
                disabled={!(this.state.email && this.state.password)}
                onClick={this.handleFormSubmit}
                theme="primary"
              >
                signup
              </FormBtn>
            </form>
          </Col>
          
        </Row>
        {/* redirect on authenticated */}
        {this.props.user && this.props.user._id ? <Redirect to='/home'/>: <div></div>}
      </Container></Card>
    );
  }
}

export default Signup;
