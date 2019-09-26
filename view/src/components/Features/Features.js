import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Features.css';
// import { setAlert } from '../../actions/alert';
const Features = ({ isAuthenticated }) => {
  return (
    <div>
      <section id='info' className='py-5'>
        <div className='container trip-container'>
          <h2 className='text-center' id='feature'>
            FEATURES
          </h2>
          <div className='row'>
            <div className='col-md-6 align-self-center'>
              <h2 className='know'>Know How You Spend</h2>
              <p className='with'>
                With TriptoTracker, you’re able to see the statistics of your
                spending on a weekly, monthly and yearly basis
              </p>
              <Link to='/dashboard' className='nav-link'>
                <button className='dashboard'>View dashboard</button>
              </Link>
              <img
                style={{ width: '241px', height: '195px' }}
                src='https://res.cloudinary.com/veecee/image/upload/v1569412683/image1_zhscjq.jpg'
                alt='sitting-man'
                className='sittingman'
              />
            </div>
            <div className='col-md-6'>
              <img
                style={{ width: '241px', height: '195px' }}
                src='https://res.cloudinary.com/veecee/image/upload/v1569412639/image2_sm9qwp.jpg'
                alt='images'
                className='standingman'
              />
              <h2 className='know' style={{ marginLeft: '60px' }}>
                Manage Your Finances
              </h2>
              <p className='with' style={{ marginLeft: '60px' }}>
                TriptoTracker helps you Manage your finances using the “set
                budget” feature
              </p>
              <Link to='/add-expense' className='nav-link'>
                <button className='expenses' style={{ marginLeft: '50px' }}>
                  Add expenses
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  null
)(Features);
