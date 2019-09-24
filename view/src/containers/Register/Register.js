import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/auth'
import './Register.css'
const Register = ({ isAuthenticated, register, history }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const { username, email, password } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.username]: e.target.value });
  };
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className='container-fluid tab-pc mt-5'>
        <div className='row'>
          <div className='col-sm-6 pattern' />
          <div className='col-sm-6 side'>
            <h1 className='mobile'>
              <img
                src='https://res.cloudinary.com/taofeeq/image/upload/v1569272981/TriptoTracker/logo_uhmcpr.png'
                alt='TriptoTracker logo'
              />
            </h1>
            <h1>Sign Up</h1>
            <form
              onSubmit={e => {
                e.preventDefault();

                register(username, email, password, history);
              }}
              className='form-horizontal'
              role='form'>
              <div className='form-group'>
                <label className='control-label sm-1 ml-3' htmlFor='usr'>
                  Username
                </label>
                <div className='col-sm-11'>
                  <input
                    onChange={e => onChange(e)}
                    type='text'
                    placeholder='JohnDoe'
                    name='name'
                    value={username}
                    required
                    className='form-control'
                  />
                </div>
              </div>
              <div className='form-group'>
                <label className='control-label sm-1 ml-3' htmlFor='email'>
                  Email
                </label>
                <div className='col-sm-11'>
                  <input
                    onChange={e => onChange(e)}
                    type='email'
                    placeholder='jdoe@gmail.com'
                    name='name'
                    value={email}
                    required
                    className='form-control'
                  />
                </div>
              </div>
              <div className='form-group'>
                <label className='control-label sm-1 ml-3' htmlFor='pwd'>
                  Password
                </label>
                <div className='col-sm-11'>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    className='form-control'
                    minLength={8}
                    onChange={e => onChange(e)}
                    placeholder='********'
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
              <p>
                Already a member? <Link to='/login'>Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { register }
)(Register);
