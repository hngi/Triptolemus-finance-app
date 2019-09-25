import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import './Navbar.css';
const Navbar = ({ logout, isAuthenticated }) => {
  return (
    <div>
      <header className='main-header'>
        <div id='logo'>
          <img
            alt='logo'
            src='https://res.cloudinary.com/taofeeq/image/upload/v1569272981/TriptoTracker/logo_uhmcpr.png'
          />
        </div>
        <div>
          <button className='toggle-button'>
            <span className='toggle-button__bar' />
            <span className='toggle-button__bar' />
            <span className='toggle-button__bar' />
          </button>
        </div>
        <nav className='main-nav'>
          <ul className='main-nav__items'>
            <li className='main-nav__item'>
              <Link to='#'>Home</Link>
            </li>
            <li className='main-nav__item'>
              <Link to='#'>Features</Link>
            </li>
            <li className='main-nav__item'>
              <Link to='#'>Downloads</Link>
            </li>
            <li className='main-nav__item'>
              <Link to='#'>FAQs</Link>
            </li>
            <li className='main-nav__item'>
              <Link to='#'>Contact</Link>
            </li>

            {isAuthenticated ? (
              <Fragment>
                <li className='main-nav__item'>
                  <Link to='/dashboard'>Dashboard</Link>
                </li>
                <li className='main-nav__item' onClick={() => logout()}>
                  <Link to='/'>
                    {' '}
                    <span className='hide-sm'>Logout</span>{' '}
                    <i className='fas fa-sign-out-alt'> </i>
                  </Link>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className='main-nav__item'>
                  <Link to='/register'>Register</Link>
                </li>
                <li className='main-nav__item'>
                  <Link to='/login'>Login</Link>
                </li>
              </Fragment>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
