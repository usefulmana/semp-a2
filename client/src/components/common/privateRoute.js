import React from 'react'
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (auth.isLoading) {
                return <h2>Loading...</h2>;
            } else if (auth.isAuthenticated) {
              return  <Component {...props} />;
            } else {
              return <Redirect to="/" />;
            }
        }}
    />
);

