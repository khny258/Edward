import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/UserHome';
import Landing from './pages/Landing'
import Dash from './pages/Dash'
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoMatch from './pages/NoMatch';
import Navbar from './containers/Navbar';
import Alert from './components/Alert';
import { user as userAPI } from "./utils/API"
import './App.css';

function App() {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);
	const [alertInfo, setAlertInfo] = useState({message:"", theme:"success"});

   useEffect(() => {
		// only setting user if we got one, to avoid rerendering the page.
		userAPI.authenticate()
			.then(res => {
				if(res.data ) setUser(res.data);
				
				setLoading(false);
			})
			.catch( e => {
				setLoading(false);
				setAlertInfo({message:e.response.data})
			})
   }, []);
   
	return (
		<>
			<Router>
				<Route render={ props => 
					<Navbar user={user} setUser={setUser} {...props} />
				} />
				<Switch>
					<Route
						exact
						path='/login'
						render={ props => (
							<Login
								{...{ user, setUser, setLoading, setAlertInfo }} 
								{...props}
							/>
						)}
					/>
					{/* <Route
						path='/login'
						render={ () => <Redirect to="/" />}
					/> */}
					{/* you could add app props as in the login page: {...{ 1st-prop-you-want-to-pass, 2nd-prop-you-want-to-pass, n-th-prop }} */}
					<Route 
						exact 
						path='/signup' 
						render={ props => <Signup user={user} loading={loading} setLoading={setLoading} setUser={setUser} setAlertInfo={setAlertInfo} {...props}/> } />
					<ProtectedRoute exact path="/home" {...{user, loading, Component: Home} } />
					<ProtectedRoute exact path="/dash" {...{user, loading, Component: Dash} } />
					<Route path='/' component={Landing} {...user} loading={loading} />
					<Route component={NoMatch} />
				</Switch>
			</Router>
			{ alertInfo.message 
				? <Alert alertInfo={alertInfo} setAlertInfo={setAlertInfo} />
				: <></> }
		</>
	);
}

export default App;
