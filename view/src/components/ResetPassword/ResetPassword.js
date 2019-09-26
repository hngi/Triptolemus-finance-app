import React from 'react'
import {Link} from 'react-router-dom'
const ResetPassword = () => {
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
            <div className='form-group hover button text-white'>
              <input
                type='submit'
                className='btnSubmit'
                defaultValue='Submit'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword
