import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { addItem } from '../../actions/item';

import './Register.css';
const Register = ({ isAuthenticated, register, history }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const { username, email, password } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <section className='signup-container'>
        <div className='row signup-row'>
          <div className='col-sm-6 pattern signup-pattern signup-pattern-container' />
          <div className='col-sm-6 signup-side'>
            <div className='signup-form-container' style={{margin:"0px auto"}}>
              <h1 className='mobile'>
                <img
                  src='https://res.cloudinary.com/taofeeq/image/upload/v1569272981/TriptoTracker/logo_uhmcpr.png'
                  alt='TriptoTracker logo'
                />
              </h1>
              <h1 className='large signup-label'>Sign Up</h1>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  register(username, email, password, history);
                }}
                className='form-horizontal'>
                <div className='form-group'>
                  <label
                    className='control-label sm-1 signup-input-label'
                    htmlFor='username'>
                    Username
                  </label>
                  <div className='col-sm-11'>
                    <input
                      onChange={e => onChange(e)}
                      type='text'
                      placeholder='JohnDoe'
                      name='username'
                      value={username}
                      id='username'
                      pattern='^[a-zA-Z0-9]*$'
                      required
                      className='form-control'
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label
                    className='control-label sm-1 signup-input-label'
                    htmlFor='email'>
                    Email
                  </label>
                  <div className='col-sm-11'>
                    <input
                      type='email'
                      placeholder='jdoe@gmail.com'
                      name='email'
                      id='email'
                      value={email}
                      required
                      onChange={e => onChange(e)}
                      className='form-control'
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label
                    className='control-label sm-1 signup-input-label'
                    htmlFor='password'>
                    Password
                  </label>
                  <div className='col-sm-11'>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      className='form-control'
                      minLength={3}
                      onChange={e => onChange(e)}
                      placeholder='********'
                      required
                    />
                  </div>
                </div>

                <div className='form-group'>
                  <div className='sm-1' />
                  <div className='col-sm-11'>
                    <button type='submit' className='btn form-control'>
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
              <p style={{margin:"0px auto",textAlign:"center"}}>
                Already a member? <Link to='/login'>Sign In</Link>
                <Link className='ml-2' to='/'>
                  Home
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { register, addItem }
)(Register);
