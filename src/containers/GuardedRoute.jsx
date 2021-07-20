import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function GuardedRoute({ children, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => auth ? children : <Redirect to='/signup' />}
    />
  );
}

export default GuardedRoute;