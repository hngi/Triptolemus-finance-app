import React from 'react';
import { connect } from 'react-redux';
const Dashboard = isAuthenticated => {
  return <div>Dashboard</div>;
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(Dashboard);
