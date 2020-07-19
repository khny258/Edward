import React from 'react';
import { Button } from '../../components/Button';
import { Link, useLocation } from 'react-router-dom';
import { user as userAPI } from '../../utils/API';

const Navbar = props => {

	const signout = () => {
		userAPI
			.signout()
			.then(() => props.setUser({}))
			.catch(e => { throw e });
	};

	// get location from react router location hook
	let location = useLocation();
	
	console.group('navbar')
	console.info(`🌎 page rendered at path: '${location.pathname}'`, "\n");
	console.info('🤖 user', props.user);
	console.groupEnd();

		return (
			<nav className="navbar"
				style={{color: 'white',  backgroundColor:"#0A0A23"}}
			>
			<Link to="/home" style={{ color: '#FFF' }} className="navbar-brand" >Edward</Link>
            { props.user._id 
               ?<> 
			   		<Link to="/dash" style={{ color: '#a873fc', textDecoration: 'none'}}>My Feed</Link>
					<div className="d-flex flex-row ml-auto">
						<div className="text-light mr-2 my-auto" >
							<span className="align-middle m-auto">Hi {props.user.firstname}</span>
						</div>
						<div className="">
							<Button theme='dark' onClick={signout}>
								<i className='fa fa-sign-out fa-1x' aria-hidden='true'></i>
							</Button>
						</div>				 
					</div>
				</>
               : location.pathname === '/login' 
                  ? <Link to='/signup'><Button theme='primary'>Sign Up</Button></Link>
				      : <Link to='/login'><Button>Log In</Button></Link> }			
			</nav>
		);
};
export default Navbar;
