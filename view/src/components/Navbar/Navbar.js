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
          <Link to='/'>
            <img
              style={{ width: '175px', height: '35px' }}
              alt='logo'
              src='
https://res.cloudinary.com/busola/image/upload/c_scale,h_35,w_175/v1569398282/Logo_-_dark.png'
            />
          </Link>
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
              <Link to='/'>Home</Link>
            </li>
            <li className='main-nav__item'>
              <Link to='/features'>Features</Link>
            </li>
            <li className='main-nav__item'>
              <Link to='/downloads'>Downloads</Link>
            </li>
            <li className='main-nav__item'>
              <Link to='/faqs'>FAQs</Link>
            </li>
            <li className='main-nav__item'>
              <Link to='/contact'>Contact</Link>
            </li>

            {isAuthenticated ? (
              <Fragment>
                <li className='main-nav__item'>
                  <Link to='/dashboard'>Dashboard</Link>
                </li>
                <li className='main-nav__item' onClick={() => logout()}>
                  <Link to='/login'>
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
