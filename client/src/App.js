import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoMatch from './pages/NoMatch';
import Navbar from './containers/Navbar';
import Alert from './components/Alert';
import { user as userAPI } from "./utils/API"
import './App.css';

function App() {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);
	const [alertInfo, setAlertInfo] = useState({message:"", theme:"success"});

   useEffect(() => {
		// no catch, add if you want to check for it.
		// only setting user if we got one, to avoid rerendering the page.
      userAPI.authenticate()
			.then(res => res.data ? setUser(res.data) : 0);
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
						path='/'
						render={ props => (
							<Login
								{...{ user, setUser, setLoading, setAlertInfo }} 
								{...props}
							/>
						)}
					/>
					<Route
						path='/login'
						render={ () => <Redirect to="/" />}
					/>
					<Route exact path='/signup' component={Signup} {...user} loading={loading} />
					<ProtectedRoute exact path="/home" {...{user, loading, Component: Home} } />
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
