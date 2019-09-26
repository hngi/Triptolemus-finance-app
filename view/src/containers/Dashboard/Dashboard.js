import React from 'react';
import { Redirect } from "react-router";
import { goToLogin } from '../../actions/auth'
import { connect } from 'react-redux';
const Dashboard = ({ isAuthenticated, goToLogin }) => {
  if (isAuthenticated == null || !isAuthenticated) {
    goToLogin();
  }
  console.log(isAuthenticated)
  return isAuthenticated == null || !isAuthenticated ? (
    <Redirect
      push
      to="/login"
    />
  ) : <div>Dashboard</div>
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { goToLogin })(Dashboard);
