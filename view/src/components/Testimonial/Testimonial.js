import React from 'react';
import './Testimonial.css';
const Testimonial = () => {
  return (
    <div>
      <div className='container-fluid first-section'>
        <div className='row'>
          <div className='col-lg-4 m-auto '>
            <h1 className='display'>Hear From Our Amazing Users</h1>
            {/* <p className='desc'>
              TripToTracker provides users with tools and advice to improve
              their spending habits
            </p> */}
            {/* <div className='btn-div mb-5'>
              <button className='btn rounded-0 px-5 text-white' type='submit'>
                Share Your Story
              </button>
            </div> */}
          </div>
          <div className='col-lg-7'>
            <img
              src='https://res.cloudinary.com/elijjaaahhhh/image/upload/v1570178696/image_1_bvgru7.png'
              className='img-fluid bg'
              alt='background image'
            />
          </div>
        </div>
      </div>
      <div className='container-fluid two'>
        <div className='row'>
          <div className='col-lg-4 item '>
            <img
              src='https://res.cloudinary.com/elijjaaahhhh/image/upload/v1570185815/image_3_klbnao.png'
              className='img-fluid m1'
              alt=''
            />
          </div>
          <div className='col-lg-8 m-auto pad'>
            <h3 className='mb-4 desc'>James Doe</h3>
            <p>
              TriptoTracker is such a helpful tool. SInce I started using the
              app I have been able to effectively track my monthly expenses and
              I discovered areas that consumed most of my funds such frequent
              Uber trips and spontaneous outdoor meals. Now I work with my
              budget and I have been able to put my funds into more effective
              use. Thank you TriptoTracker!
            </p>
          </div>
          <div className='col-lg-8 m-auto pad'>
            <h3 className='mb-4 desc'>Johnson Adams</h3>
            <p>
              TriptoTracker is such a helpful tool. SInce I started using the
              app I have been able to effectively track my monthly expenses and
              I discovered areas that consumed most of my funds such frequent
              Uber trips and spontaneous outdoor meals. Now I work with my
              budget and I have been able to put my funds into more effective
              use. Thank you TriptoTracker!
            </p>
          </div>
          <div className='col-lg-4 item'>
            <img
              src='https://res.cloudinary.com/elijjaaahhhh/image/upload/v1570185801/image_2.1_qc4ywr.png'
              className='img-fluid m2'
              alt=''
            />
          </div>
          <div className='col-lg-4 item'>
            <img
              src='https://res.cloudinary.com/elijjaaahhhh/image/upload/v1570185786/image_2_qn5ndq.png'
              className='img-fluid m1'
              alt=''
            />
          </div>
          <div className='col-lg-8 m-auto pad'>
            <h3 className='mb-4 desc'>Tammy Abraham</h3>
            <p>
              TriptoTracker is such a helpful tool. SInce I started using the
              app I have been able to effectively track my monthly expenses and
              I discovered areas that consumed most of my funds such frequent
              Uber trips and spontaneous outdoor meals. Now I work with my
              budget and I have been able to put my funds into more effective
              use. Thank you TriptoTracker!
            </p>
          </div>
        </div>
      </div>
      {/* <footer className='container-fluid text-white'>
        <div className='row'>
          <div className='col-lg-3'>
            <p>Company</p>
            <a href>
              <ul>
                <li>About Us</li>
                <li>FAQ</li>
                <li>Stories</li>
              </ul>
            </a>
          </div>
          <div className='col-lg-3'>
            <p>Product</p>
            <a href>
              <ul>
                <li>Features</li>
              </ul>
            </a>
          </div>
          <div className='col-lg-3'>
            <p>Legal</p>
            <a href>
              <ul>
                <li>Private policy</li>
                <li>Terms</li>
              </ul>
            </a>
          </div>
          <div className='col-lg-3'>
            <p>Connect</p>
            <a href>
              <ul>
                <li>Email</li>
                <li>Mobile</li>
              </ul>
            </a>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default Testimonial;
