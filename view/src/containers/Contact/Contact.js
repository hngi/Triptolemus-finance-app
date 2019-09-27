import React, { useState } from 'react';
import './Contact.css';
import { connect } from 'react-redux';
import { contact } from '../../actions/contact';
const Contact = ({ contact, history }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: ''
  });
  const { fullname, email, message } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <section id='info' className='py-0'>
        <div className='container'>
          <div className='row'>
            <div
              className='col-md-6 col-sm-6 align-self-center'
              style={{ backgroundColor: '#022EC1', height: '530px' }}
              id='contain'>
              <img
                src='https://res.cloudinary.com/busola/image/upload/v1569523574/phone.png'
                alt='phone call'
                style={{ width: 'auto', height: 'auto', float: 'left' }}
                className='image'
              />
              <div className='content'>
                <p className='touch0 mt-4'>Get in touch</p>
                <p className='touch1'>contact@triptolemus.ng</p>
                <p className='touch2' style={{ marginTop: '20px' }}>
                  +234 811 111 1111
                </p>
              </div>
            </div>
            <div className='col-md-6 col-sm-6' style={{ marginTop: '95px' }}>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  contact(fullname, email, message, history);
                }}>
                <div className='form-group'>
                  <label htmlFor='fullName'>Full Name</label>
                  <input
                    onChange={e => onChange(e)}
                    value={fullname}
                    type='text'
                    name='fullname'
                    className='form-control'
                    id='fullName'
                    aria-describedby='fullName'
                    placeholder='Full Name'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='exampleInputPassword1'>Email</label>
                  <input
                    onChange={e => onChange(e)}
                    value={email}
                    type='email'
                    name='email'
                    className='form-control'
                    id='exampleInputPassword1'
                    placeholder='Email'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='exampleFormControlTextarea1'>Message</label>
                  <textarea
                    onChange={e => onChange(e)}
                    value={message}
                    className='form-control'
                    id='exampleFormControlTextarea1'
                    name='message'
                    rows={3}
                    cols={50}
                    placeholder='Type your message'
                    defaultValue={''}
                  />
                  <div className='col-sm-11'>
                    <button type='submit' className='btn form-control'>
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default connect(
  null,
  { contact }
)(Contact);
