import React from 'react';
import './Contact.css';
const Contact = () => {
  return (
    <div className='contact_page' id='contact'>
      <div className='container'>
        <h3 className='contact_title'>Contact us</h3>
        <div className='contact_form'>
          <form action='#' method='POST'>
            <div className='form-group contact_input'>
              <input
                type='text'
                className='name'
                name='name'
                placeholder='First Name'
                required
              />
            </div>
            <div className='form-group contact_input'>
              <input
                type='text'
                className='name'
                name='name'
                placeholder='Last Name'
                required
              />
            </div>
            <div className='form-group contact_input'>
              <input
                type='email'
                className='name'
                name='name'
                placeholder='Email'
                required
              />
            </div>
            <div className='form-group contact_input'>
              <input
                type='text'
                className='name'
                name='name'
                placeholder='Subject'
                required
              />
            </div>
            <div className='form-group contact_input'>
              <textarea placeholder='Your Message' required defaultValue={''} />
            </div>
            <input className='butn' type='submit' defaultValue='SEND MESSAGE' />
          </form>
        </div>
        <div className='clearfix' />
        <div className='row contact_main'>
          <div className='col-md-6 sm-12 contact_info'>
            <h3>Contact Info</h3>
            <div className='mailing'>
              <div className='contact_icon'>
                <span className='fa fa-envelope' aria-hidden='true' />
              </div>
              <div className='mail_contact'>
                <h4>Mail us</h4>
                <p>
                  <a href='mailto:contact@recit.ng'>contact@recit.ng</a>
                </p>
              </div>
              <div className='clearfix' />
            </div>
            <div className='call_contact'>
              <div className='contact_icon'>
                <span className='fa fa-phone' aria-hidden='true' />
              </div>
              <div className='contact_text'>
                <h4>Call us</h4>
                <p>
                  <a href='callto:+2348011111111'>
                    +234&nbsp;801&nbsp;111&nbsp;1111
                  </a>
                </p>
              </div>
              <div className='clearfix' />
            </div>
            <div className='visit_us'>
              <div className='contact_icon'>
                <span className='fa fa-home' aria-hidden='true' />
              </div>
              <div className='contact_visit'>
                <h4>Visit us</h4>
                <p>Herbert Macaulay Way, Yaba</p>
                <p>Lagos, Nigeria</p>
              </div>
              <div className='clearfix' />
            </div>
          </div>
          <div className='col-md-6 sm-12 map_text'>
            <h3>Our Location</h3>
            <iframe title='maps'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.1918594870676!2d3.3770362143750847!3d6.497377725270014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c6192dd6f47%3A0xc71744abe2d58220!2sHerbert%20Macaulay%20Way%2C%20Lagos!5e0!3m2!1sen!2sng!4v1569353322752!5m2!1sen!2sng'
              allowFullScreen
            />
          </div>
          <div className='clearfix' />
        </div>
      </div>
    </div>
  );
};

export default Contact;
