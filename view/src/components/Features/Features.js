import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Features.css';
// import { setAlert } from '../../actions/alert';
const Features = ({ isAuthenticated }) => {
  return (
    <div>
      <section id='main-body'>
        {/*-----------------------------------------------------------*/}
        <h2 className='container text-center' id='features-tag'>
          <strong>Features</strong>
        </h2>
        {/*-----------------------------------------------------------*/}
        <div className='container' id='partition1'>
          <div className='row'>
            <div id='left-side' className='col-md-6'>
              <h2 className='text-muted'>Know how you spend</h2>
              <p className='text-muted'>
                With TriptoTracker, you're able to see the statistics of your
                spending on a weekly, monthly, and yearly basis.
              </p>
              <Link to='/dashboard'>
                <button id='button' className='btn btn-sm rounded'>
                  View Dashboard
                </button>
              </Link>
            </div>
            <div id='right-side' className='col-md-6 text-center'>
              <img
                style={{ width: '241px', height: '195px' }}
                src='https://res.cloudinary.com/veecee/image/upload/v1569412683/image1_zhscjq.jpg
'
                alt='image1'
              />
            </div>
          </div>
        </div>
        {/*-----------------------------------------------------------*/}
        <div className='container' id='partition2'>
          <div className='row'>
            <div id='left-side2' className='col-md-6'>
              <img
                style={{ width: '241px', height: '195px' }}
                src='https://res.cloudinary.com/veecee/image/upload/v1569412639/image2_sm9qwp.jpg
'
                alt='image2'
              />
            </div>
            <div id='right-side2' className='col-md-6'>
              <h2 className='display-6 text-muted'>Manage your finances</h2>
              <p className='text-muted'>
                TriptoTracker helps you manage your finances using the "set
                budget" feature
              </p>
              <Link to='/add-expense'>
                <button id='button' className='btn btn-sm rounded'>
                  Add expenses
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/*-----------------------------------------------------------*/}
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
