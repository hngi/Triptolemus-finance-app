import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Profile.css';
import { fetchProfile } from '../../actions/auth';
import { updateProfile } from '../../actions/profile';
import { Redirect} from 'react-router-dom';
import { showLoginAlert, logout } from '../../actions/auth';
import { GoogleLogout } from 'react-google-login';
import moment from 'moment'
const Profile = ({
  auth,
  updateProfile,
  history,
  logout,
  fetchProfile,
  showLoginAlert
}) => {
  const { isAuthenticated, user, profile } = auth;
  useEffect(() => {
    if (
      isAuthenticated == null ||
      !isAuthenticated ||
      user == null ||
      !user ||
      profile == null ||
      !profile
    ) {
      return;
    }
    const userId = user.id;

    fetchProfile(userId);
  }, [fetchProfile]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    gender: '',
    date_of_birth: ''
  });
  if (isAuthenticated == null || !isAuthenticated || user == null || !user) {
    showLoginAlert('You need to be logged in to do that', 'danger', history);
    return <Redirect to='/login' />;
  }
  const {
    first_name,
    last_name,
    phone_number,
    gender,
    date_of_birth
  } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const userId = user.id;
  return (
    <>
      <nav
        className='navbar navbar-expand-md navbar-light fixed-top py-4'
        id='main-nav'>
        <div className='container'>
          <Link to='/' className='navbar-brand logo'>
            <img
              src='https://res.cloudinary.com/taofeeq/image/upload/v1569508859/TriptoTracker/icon-white_l40nxz.png'
              width={210}
              height={30}
              alt='TriptoTracker logo'
            />
          </Link>
          <ul className='navbar-nav ml-auto sideNav'>
            <li className='nav-item dropdown mr-3'>
              <Link
                to='/'
                className='nav-link dropdown-toggle'
                data-toggle='dropdown'>
                <i className='fas fa-user' style={{ color: 'white' }} />{' '}
                <span className='list'>
                  {' '}
                  {user
                    ? user.username.charAt(0).toUpperCase() +
                      user.username.slice(1)
                    : null}{' '}
                </span>
              </Link>
              <div className='dropdown-menu dropNav'>
                <div style={{ display: 'none' }}>
                  <GoogleLogout
                    id='googleLogOutBtn'
                    clientId='97829381082-c0ai7rdhuh92m5g6g0qeh4ek9f7e9fm3.apps.googleusercontent.com'
                    buttonText='Logout'
                    onLogoutSuccess={logout}
                    onFailure={() => logout()}
                  />
                </div>
                <Link
                  onClick={() => {
                    if (auth.isSignedInWithGoogle) {
                      document.getElementById('googleLogOutBtn');
                    }

                    logout();
                  }}
                  to='/login'
                  className='dropdown-item'
                  style={{ margin: '0px auto', textAlign: 'center' }}>
                  <i className='fas fa-sign-out-alt' /> Logout
                </Link>
                {/* <Link
                  to='/dashboard'
                  className='dropdown-item'
                  style={{ margin: '0px auto', textAlign: 'center' }}>
                  <i className='fas fa-home' /> Dashboard
                </Link> */}
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <section className='py-'>
        <div className='container'>
          <div className='row profile ml-2'>
            <Link to='/Dashboard'>
              <i className='fa fa-arrow-left' />
            </Link>
            <h1 className='ml-2 proHead'>Profile</h1>
          </div>
          <div className='rowfirst_ ml-2'>
            <div id='proAccount' className='col-sm-12'>
              <h1>Personal Profile</h1>
              <div className='row mt-2'>
                <div className='col-sm-6'>
                  <h3>full name</h3>
                </div>
                <div className='col-sm-6 proName'>
                  <p>
                    {profile
                      ? profile.first_name + ' ' + profile.last_name
                      : null}
                  </p>
                </div>
              </div>
              <div className='row mt-2'>
                <div className='col-sm-6'>
                  <h3>phone number</h3>
                </div>
                <div className='col-sm-6'>
                  <p>{profile ? profile.phone_number : null}</p>
                </div>
              </div>
              <div className='row mt-2'>
                <div className='col-sm-6'>
                  <h3>gender</h3>
                </div>
                <div className='col-sm-6'>
                  <p>{profile ? profile.gender : null}</p>
                </div>
              </div>
              <div className='row mt-2'>
                <div className='col-sm-6'>
                  <h3>date of birth</h3>
                </div>
                <div className='col-sm-6'>
                  <p>{profile ? moment(profile.date_of_birth).format('YYYY-MM-DD') : null}</p>
                </div>
              </div>
              <div className='row mt-2'>
                <div className='col-sm-6' />
                <div className='col-sm-6'>
                  <button
                    className='btn editBtn'
                    data-toggle='modal'
                    data-target='#editDetails'>
                    Edit Profile
                  </button>
                  <div id='editDetails' className='modal fade' role='dialog'>
                    <div className='modal-dialog'>
                      <div className='modal-content'>
                        <div className='modal-head'>
                          <h1 className='ml-3'>Edit Profile</h1>
                        </div>
                        <div className='modal-body'>
                          <form
                            onSubmit={e => {
                              e.preventDefault();
                              updateProfile(
                                first_name,
                                last_name,
                                phone_number,
                                gender,
                                date_of_birth,
                                userId
                              );
                            }}
                            role='form'
                            className='form-horizontal'>
                            <div className='row mt-1'>
                              <div className='col-sm-6'>
                                <div className='form-group'>
                                  <label className='control-label sm-1 ml-3'>
                                    First Name
                                  </label>
                                  <div className='col-sm-11'>
                                    <input
                                      type='text'
                                      name='first_name'
                                      className='form-control'
                                      placeholder='James Doe'
                                      onChange={e => onChange(e)}
                                      value={first_name}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className='form-group'>
                                  <label className='control-label sm-1 ml-3'>
                                    Last Name
                                  </label>
                                  <div className='col-sm-11'>
                                    <input
                                      type='text'
                                      name='last_name'
                                      className='form-control'
                                      placeholder='James Doe'
                                      onChange={e => onChange(e)}
                                      value={last_name}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='row mt-1'>
                              <div className='col-sm-6'>
                                <div className='form-group'>
                                  <label className='control-label sm-1 ml-3'>
                                    Phone number
                                  </label>
                                  <div className='col-sm-11'>
                                    <input
                                      type='text'
                                      name='phone_number'
                                      class='form-control'
                                      placeholder='+2348031284857'
                                      onChange={e => onChange(e)}
                                      value={phone_number}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='row mt-1'>
                              <div className='col-sm-6'>
                                <div className='form-group'>
                                  <label className='control-label sm-1 ml-3'>
                                    Gender
                                  </label>
                                  <div className='col-sm-11'>
                                    <input
                                      type='text'
                                      name='gender'
                                      class='form-control'
                                      placeholder='Male/Female/Other'
                                      onChange={e => onChange(e)}
                                      value={gender}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='row mt-1'>
                              <div className='col-sm-6'>
                                <div className='form-group'>
                                  <label className='control-label sm-1 ml-3'>
                                    Date of birth
                                  </label>
                                  <div className='col-sm-11'>
                                    <input
                                      type='date'
                                      name='date_of_birth'
                                      class='form-control'
                                      onChange={e => onChange(e)}
                                      value={date_of_birth}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='row mt-1'>
                              <div className='col-sm-6' />
                              <div className='col-sm-6'>
                                <div className='form-group'>
                                  <div className='sm-1' />
                                  <div className='col-sm-11'>
                                    <button
                                      data-toggle='modal'
                                      data-target='#editDetails'
                                      type='submit'
                                      className='btn form-control proBtn'>
                                      {auth.loading ? (
                                        <i className='fa fa-circle-o-notch text-white spin-loader' />
                                      ) : null}
                                      Update Profile
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { updateProfile, fetchProfile, logout, showLoginAlert }
)(Profile);
