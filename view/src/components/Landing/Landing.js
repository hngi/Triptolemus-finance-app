import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Landing.css';
const Landing = ({ isAuthenticated }) => {
  return (
    <>
      <section id='landing-info' className='landing-py-'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 align-self-center'>
              <p className='landing-msg'>
                A whole new way to manage your spending
              </p>
              <ul>
                <li className='landing-list'>Know how you spend</li>
                <li className='landing-list'>Manage your finances</li>
              </ul>
              {isAuthenticated ? null : (
                <Link to='/register' className='nav-link'>
                  <button className='btn-signup landing-btn-signup'>
                    Sign up for free
                  </button>
                </Link>
              )}
            </div>
            <div className='col-md-6'>
              <img
                src='https://res.cloudinary.com/taofeeq/image/upload/v1569516973/TriptoTracker/Group_zgzvja.png'
                alt='image1'
                className='img-fluid'
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  null
)(Landing);
