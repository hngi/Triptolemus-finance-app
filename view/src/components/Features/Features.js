import React from 'react';
import { Link } from 'react-router-dom';
import './Features.css';
const Features = () => {
  return (
    <>
      <section
        id='features-info'
        className='py-5'
        style={{ marginTop: '40px' }}>
        <div className='container'>
          <h2 className='text-center' id='feature'>
            FEATURES
          </h2>
          <div className='row'>
            <div className='col-md-6 align-self-center'>
              <h2 className='know'> Know How You Spend</h2>
              <p className='with'>
                {' '}
                With TriptoTracker, you’re able to see the statistics of your
                spending on a weekly, monthly and yearly basis
              </p>
              <Link to='/dashboard' className='nav-link'>
                <button className='dashboard'>View dashboard</button>
              </Link>
              <img
                src='https://res.cloudinary.com/taofeeq/image/upload/v1569516973/TriptoTracker/sittingman_eobapf.jpg'
                alt='sitting-man'
                className='sittingman'
              />
            </div>
            <div className='col-md-6'>
              <img
                src='https://res.cloudinary.com/taofeeq/image/upload/v1569516973/TriptoTracker/standingman_k26ytc.jpg'
                alt='image1'
                className='standingman'
              />
              
              <h2 className='know' id="know1">
                Manage Your Finances
              </h2>
              
              <p className='with' id="with1">
                {' '}
                TriptoTracker helps you Manage your finances using the “set
                budget” feature
              </p>
              <Link to='/add-expense' className='nav-link'>
              
                <button className='dashboard'>
                  Add expenses
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


export default Features;
