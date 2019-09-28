import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {resetPassword} from '../../actions/auth';


const ResetPassword = ({resetPassword,history,match}) => {
  const {header, payload,signature}= match.params
  const [formData, setFormData] = useState({
     password:''
  });
  const {password } = formData;
  const email_token = [header,payload,signature].join(".")
  console.log(email_token)
  const onChange = e => {
    console.log(e.target.name + " " + e.target.value)
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
              resetPassword(email_token,password,history)
            }}>
            <div className='new_password'>
              <label htmlFor='password'>Enter new password</label>
              <input
                type='text'
                name='password'
                className='form-control input1'
                placeholder='************'
                defaultValue
                onChange={(e)=>{
                  onChange(e);
                }}
              />
            </div>

            {/* <div className='col-sm-11'> */}
              <button type='submit' className='btn form-control'>
                Submit
              </button>
            {/* </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { resetPassword }
)(ResetPassword);
