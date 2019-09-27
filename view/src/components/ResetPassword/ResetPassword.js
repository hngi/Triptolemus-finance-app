import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {resetPassword} from '../../actions/auth';
const ResetPassword = ({resetPassword,history}) => {
  const [formData, setFormData] = useState({
    token:'',
    password:''
  });
  const { token, password } = formData;
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
          <form>
            <div className='new_password'>
              <label htmlFor='password'>Enter new password</label>
              <input
                type='text'
                name='password'
                className='form-control input1'
                placeholder='************'
                defaultValue
              />
            </div>
            <div className='confirm_pass'>
              <label htmlFor='password'>Confirm new password</label>
              <input
                type='password'
                name='confirm_password'
                className='form-control input1'
                placeholder='************'
                defaultValue
              />
            </div>
            {/* <div className='col-sm-11'> */}
              <button type='submit' onClick={(e)=>{
                    e.preventDefault();
                    resetPassword(token,history)
              }} className='btn form-control'>
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
