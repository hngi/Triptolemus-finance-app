import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
const Dashboard = isAuthenticated => {
  return <div>Dashboard</div>;
};

// export default Dashboard
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(Dashboard);
