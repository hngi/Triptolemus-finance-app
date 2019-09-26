import React from 'react';
import './Contact.css';
const Contact = () => {
  return (
    <div>
      <section id='info' className='py-5'>
        <div className='container'>
          <div className='row'>
            <div
              className='col-md-6 col-sm-6 align-self-center'
              style={{ backgroundColor: '#022EC1', height: '530px' }}
              id='contain'>
              <img
                src='image/shutterstock-446608831-removebg-preview.png'
                alt='phone call'
                style={{ float: 'left' }}
                className='image'
              />
              <div className='content'>
                <p className='touch0'>get in touch</p>
                <p className='touch1'>contact@recit.ng</p>
                <p className='touch2' style={{ marginTop: '20px' }}>
                  +234 811 343 8223
                </p>
                <p className='touch3' style={{ marginTop: '20px' }}>
                  20 Prince Hakerem Lekki Phase 1, Lagos.
                </p>
                {/* <button class="circle"> <img src="image/Vector.png" alt=""> </button> */}
              </div>
            </div>
            <div className='col-md-6 col-sm-6' style={{ marginTop: '95px' }}>
              <form>
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
      <section id='home-icons' className='icons'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4 mb-4 text-center'>
              <img src='image/call.png' alt='call' />
              <span className='three'>+234 811 343 8223</span>
            </div>
            <div className='col-md-4 mb-4 text-center'>
              <img src='image/envelop.png' alt='message' />
              <span className='three'>contact@recit.ng</span>
            </div>
            <div className='col-md-4 mb-4 text-center'>
              <img src='image/icon.png' alt='icon' />
              <span className='three'>recit.ng</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
