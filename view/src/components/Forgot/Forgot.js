import React from 'react'
import './Forgot.css'
const Forgot = () => {
  return (
    <div className='container'>
      <div className='forgot'>
        <h1>Forgot password?</h1>
        <p>
          It is okay cos we are humans. Let's help you get back your login
          details
        </p>
      </div>
      <form action method className='form-horizontal'>
        <div className='form-group'>
          <label className='control-label sm-1 ml-3' htmlFor='email'>
            Enter your email address
          </label>
          <div className='col-sm-11'>
            <input
              type='email'
              name='email'
              id='email'
              className='form-control'
              placeholder='johndoe@gmail.com'
            />
          </div>
        </div>
        <div className='form-group'>
          <div className='sm-1' />
          <div className='col-sm-11'>
            <button type='submit' className='btn form-control'>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Forgot
