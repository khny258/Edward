import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// prettier-ignore
const ProtectedRoute = ({ Component, loading, user }) => {
   return(
      <Route
          render={ () => {
            return (user && user._id )
              ? <Component {...{user}} />
              : loading === true 
                  ? <span className='spin' role="img" aria-label='loading'> ♻️ </span> 
                      : <Redirect to='/' />
          }}
      />
   )
}

export default ProtectedRoute;
