import React from 'react';
import './Downloads.css';
const Downloads = () => {
  return (
    <div>
      <section className='row download_triptotracker'>
        <div className='col-md-6 sm-12 download_fact'>
          <div className='download_text'>
            <h2>Download TriptoTracker App</h2>
            <p>
              Triptotracker is available on mobile on the Google Playstore and
              the iOS App store
            </p>
          </div>
          <div className='mobile_download'>
            <a href>
              <span>
                <img
                  src='https://res.cloudinary.com/busola/image/upload/v1569362427/get_in_on.png'
                  alt='google_playstore'
                />
              </span>
            </a>
            <a href>
              <span>
                <img
                  src='https://res.cloudinary.com/busola/image/upload/v1569362418/1280px-Download_on_the_App_Store_Badge.svg_1.png'
                  alt='iOS_store'
                />
              </span>
            </a>
          </div>
        </div>
        <div className='col-md-6 sm-12 download_image'>
          <img
            src='https://res.cloudinary.com/busola/image/upload/v1569362346/image3.jpg'
            alt='triptotracker_image'
          />
        </div>
      </section>
    </div>
  );
};

export default Downloads;
