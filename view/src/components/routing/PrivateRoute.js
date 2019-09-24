import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  setAlert,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated ? (
        setAlert('You have to be logged in to do that', 'danger')
         (
          <Redirect to='/login' />
         )
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { setAlert }
)(PrivateRoute);
