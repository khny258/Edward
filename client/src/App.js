import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoMatch from './pages/NoMatch';
import { user as userAPI } from "./utils/API"
import './App.css';

function App() {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);

   useEffect(() => {
      userAPI.authenticate()
         .then(res => setUser(res.data))
   }, []);
   
	return (
		<>
			<div style={{height:40, padding:10, color:"white", lineHeight:"20px"}} className="bg-success">Navbar</div>
			<Router>
				<Switch>
					<Route
						exact
						path='/'
						render={props => (
							<Login
								{...{ user, setUser, setLoading }} 
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
		</>
	);
}

export default App;
