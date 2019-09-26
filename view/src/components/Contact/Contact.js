import React from 'react';
import './Contact.css';
const Contact = () => {
  const onFormSubmit=(e)=>{
    // e.preventDefault();

  }
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
                style={{width:'auto',height:'auto', float: 'left' }}
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
              <form onSubmit={onFormSubmit()}>
                <div className='form-group'>
                  <label htmlFor='exampleInputEmail1'>Full Name</label>
                  <input
                    type='email'
                    className='form-control'
                    id='exampleInputEmail1'
                    aria-describedby='emailHelp'
                    placeholder='Full Name'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='exampleInputPassword1'>Email</label>
                  <input
                    type='password'
                    className='form-control'
                    id='exampleInputPassword1'
                    placeholder='Email'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='exampleFormControlTextarea1'>Message</label>
                  <textarea
                    className='form-control'
                    id='exampleFormControlTextarea1'
                    rows={3}
                    cols={50}
                    placeholder='Type your message'
                    defaultValue={''}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
