import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPassword } from '../../actions/auth';

const ResetPassword = ({ auth, resetPassword, history, match }) => {
  const { header, payload, signature } = match.params;
  const [formData, setFormData] = useState({
    password: ''
  });
  const { password } = formData;
  const email_token = [header, payload, signature].join('.');
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className='mt-5 container-fluid login-container '>
      <div className='row form-group justify-content-center'>
        <div className='arrow-left'>
          <Link to='/forgot'>
            <i className='fas fa-arrow-left' />
          </Link>
        </div>
        <div className='wrapper'>
          <div className='reset'>
            <h2 className='text-center'>Reset Password</h2>
          </div>
          <p className='text-center'>Set a new password for your log in</p>
          <form
            onSubmit={e => {
              e.preventDefault();
              resetPassword(email_token, password, history);
            }}>
            <div className='new_password'>
              <label htmlFor='password'>Enter new password</label>
              <input
                type='text'
                name='password'
                className='form-control input1'
                placeholder='************'
                defaultValue
                onChange={e => {
                  onChange(e);
                }}
              />
            </div>

            {/* <div className='col-sm-11'> */}
            <button type='submit' className='btn custom-form-control'>
              {auth.loading ? (
                <i className='fa fa-circle-o-notch text-white spin-loader' />
              ) : null}
              Submit
            </button>
            {/* </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { resetPassword }
)(ResetPassword);
