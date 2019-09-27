import React from 'react';
import { Redirect } from "react-router";
import { goToLogin } from '../../actions/auth'
import { connect } from 'react-redux';
const AddExpense = ({isAuthenticated,goToLogin}) => {
  if (isAuthenticated == null || !isAuthenticated) {
    goToLogin();
  }
  console.log(isAuthenticated)
  return isAuthenticated == null || !isAuthenticated ? (
    <Redirect
      to="/login"
    />
  ) : <div>Add Expense</div>
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { goToLogin })(AddExpense);
