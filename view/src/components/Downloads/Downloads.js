import React from 'react';
import './Downloads.css';
const Downloads = () => {
  return (
    <div>
      <section id='info' className='py-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 align-self-center'>
              <h2 className='download'>Download TriptoTracker App</h2>
              <p className='google'>
                TriptoTracker is available on mobile on the google playstore and
                the IOS app store
              </p>
              <img
                src='https://res.cloudinary.com/busola/image/upload/v1569362427/get_in_on.png'
                alt='sitting-man'
                className='sittingman'
              />
            </div>
            <div className='col-md-6'>
              <img
                src='https://res.cloudinary.com/busola/image/upload/v1569362418/1280px-Download_on_the_App_Store_Badge.svg_1.png'
                alt='image1'
                className='phonelaptop'
              />
              <img
                src='https://res.cloudinary.com/busola/image/upload/v1569362346/image3.jpg'
                alt='image2'
                className='phonelaptop'
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Downloads;
