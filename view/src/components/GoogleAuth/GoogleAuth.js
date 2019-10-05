import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInWithGoogle } from '../../actions/auth';
import { withRouter } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

class GoogleAuth extends Component {
  renderAuthButton() {
    return (
      <GoogleLogin
        clientId='97829381082-c0ai7rdhuh92m5g6g0qeh4ek9f7e9fm3.apps.googleusercontent.com'
        buttonText='Sign In With Google'
        onSuccess={response => {
          console.log(response);
          const { w3 } = response;
          console.log(w3);
          const { U3, ofa } = w3;

          const username = ofa;
          const password = 'googlepriviledgeuser';
          const email = U3;
          this.props.signInWithGoogle(
            username,
            email,
            password,
            this.props.history
          );
        }}
        style={{ display: 'flex', justifyContent: 'center' }}
        onFailure={response => {
          console.log('Iss  a failure something');
          console.log(response);
        }}
        cookiePolicy={'single_host_origin'}
      />
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { signInWithGoogle }
)(withRouter(GoogleAuth));
