import React, { Component } from "react";
import {} from "react";
import { Link } from 'react-router-dom';
import style from "./style.module.css";
import { scraper as scraperAPI} from "../../utils/API";

// export default ( props ) => {
class UserHome extends Component {   
    constructor(props) {
		super(props);
		// this.state = {
		// 	em,
		// 	password: ''
		// };
	} 
    render (){
        return (
        <>
        <div className={`${style.container}`} >
            Home

        <div className={style.user}>
            <h5>user:</h5>
            { Object.keys(this.props.user)
                .map( (field, i) => 
                    <p key={i}> <strong>{field}</strong>: {this.props.user[field]}</p>) 
            }
        </div>
        <div>    
            <input class="form-control" type="text" placeholder="Search" aria-label="Search" onSubmit></input>
            <Link to="/dash"  onClick={this.handleCIK}>0001326801</Link>

        </div>
        
        </>
    )
}

}

export default UserHome;


