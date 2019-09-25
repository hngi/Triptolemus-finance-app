import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import './Login.css';

const Login = ({ login, history, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <section className='login-container'>
      <div className='row login-row'>
        <div className='col-sm-6 signin-pattern signin-pattern-container' />
        <div className='col-sm-6 side'>
          <div className='login-form-container'>
            {/* <h1 className='mobile'>
              <img
                src='https://res.cloudinary.com/taofeeq/image/upload/v1569272981/TriptoTracker/logo_uhmcpr.png'
                alt='TriptoTracker logo'
              />
<<<<<<< HEAD
            </h1> */}
            <h1 className='large signin-label'>Sign In</h1>

            <form
              className='form'
              onSubmit={e => {
                e.preventDefault();
                login(email, password, history);
              }}>
              <div className='form-group'>
                <label className='signin-input-label' htmlFor='email'>
                  Email
                </label>
                <input
                  id='email'
                  className='signin-input'
                  onChange={e => onChange(e)}
                  value={email}
                  type='email'
                  placeholder='Email Address'
                  name='email'
                  required
                />
              </div>
              <div className='form-group'>
                <label className='signin-input-label' htmlFor='password'>
                  Password
                </label>
                <input
                  id='password'
                  className='signin-input'
                  onChange={e => onChange(e)}
                  value={password}
                  type='password'
                  placeholder='Password'
                  name='password'
                />
              </div>
              <p className='signin-forgot-password'>
                {' '}
                <Link to='#'>Forgot Password?</Link>
              </p>
              <input
                type='submit'
                className='btn btn-primary signin-input signin-button'
                value='Sign In'
              />
            </form>
            <p className='my-1'>
              Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { login }
)(Login);
