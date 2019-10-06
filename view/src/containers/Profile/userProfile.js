import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { Link } from 'react-router-dom';
import './userProfile.css';
import { fetchProfile } from '../../actions/auth';
import { userProfileDetails } from '../../actions/users';
const Profile = ({ auth, userProfileDetails, history, logout, fetchProfile }) => {
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
        const userId = auth.user.id;
        console.log(userId);
        fetchProfile(userId);
      }, [fetchProfile]);
    const [formData, setFormData] = useState({
    user_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    gender: '',
    date_of_birth: ''
  });
  const { user_id, first_name, last_name, email, phone_number, gender, date_of_birth} = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
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
                <Link
                  onClick={logout}
                  to='/login'
                  className='dropdown-item'
                  style={{ margin: '0px auto', textAlign: 'center' }}>
                  <i className='fas fa-sign-out-alt' /> Logout
                </Link>
                <Link to='/userProfile' className='dropdown-item'
                    style={{ margin: '0px auto', textAlign: 'center' }}>
                  <i className='fas fa-cog' /> Profile
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <section className='py-'>
        <div className='container'>
            <div className='row profile ml-2'>
                <Link to='/Dashboard'>
                    <i className='fa fa-arrow-left'></i>
                </Link>
                <h1 className='ml-2 proHead'>
                    Profile
                </h1>
            </div>
            <div className='rowfirst_ ml-2'>
                <div id='proAccount'
                    className='col-sm-12'>
                    <h1>
                        Personal Profile
                    </h1>
                    <div className='row mt-2'>
                        <div className='col-sm-6'>
                            <h3>full name</h3>
                        </div>
                        <div className='col-sm-6 proName'>
                            <p>
                                {/*codes to pull user's first name that'll be entered in the edit porofile modal*/}
                            </p>
                            <p>
                                {/*codes to pull user's lasst name that'll be entered in the edit porofile modal*/}
                            </p>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-sm-6'>
                            <h3>email address</h3>
                        </div>
                        <div className='col-sm-6'>
                            <p>
                                {/*codes to pull user's email that'll be entered in the edit porofile modal*/}
                            </p>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-sm-6'>
                            <h3>phone number</h3>
                        </div>
                        <div className='col-sm-6'>
                            <p>
                                {/*codes to pull user's phonenumber that'll be entered in the edit porofile modal*/}
                            </p>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-sm-6'>
                            <h3>gender</h3>
                        </div>
                        <div className='col-sm-6'>
                            <p>
                                {/*codes to pull user's gender that'll be entered in the edit porofile modal*/}
                            </p>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-sm-6'>
                            <h3>date of birth</h3>
                        </div>
                        <div className='col-sm-6'>
                            <p>
                                {/*codes to pull user's dae of birth that'll be entered in the edit porofile modal*/}
                            </p>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-sm-6'></div>
                        <div className='col-sm-6'>
                            <button className='btn editBtn'
                                    data-toggle='modal'
                                    data-target='#editDetails'>
                                Edit Profile
                            </button>
                            <div id='editDetails' className='modal fade' role='dialog'>
                                <div className='modal-dialog'>
                                    <div className='modal-content'>
                                        <div className='modal-head'>
                                            <h1 className='ml-3'>
                                                Edit Profile
                                            </h1>
                                        </div>
                                        <div className='modal-body'>
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault ();
                                                    userProfileDetails(first_name, last_name, email, phone_number, gender, date_of_birth, history);
                                                }} 
                                                role='form'
                                                className='form-horizontal'>
                                                <div className='row mt-1'>
                                                    <div className='col-sm-6'>
                                                        <h4>enter full name</h4>
                                                        <p>Your full name</p>
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        <div className='form-group'>
                                                            <label className='control-label sm-1 ml-3'>
                                                                First Name
                                                            </label>
                                                            <div className='col-sm-11'>
                                                                <input type='text'
                                                                    name='name'
                                                                    className='form-control'
                                                                    placeholder='James Doe'
                                                                    onChange={e => onChange(e)}
                                                                    value={first_name}
                                                                    required/>
                                                            </div>
                                                        </div>
                                                        <div className='form-group'>
                                                            <label className='control-label sm-1 ml-3'>
                                                                Last Name
                                                            </label>
                                                            <div className='col-sm-11'>
                                                                <input type='text'
                                                                    name='name'
                                                                    className='form-control'
                                                                    placeholder='James Doe'
                                                                    onChange={e => onChange(e)}
                                                                    value={last_name}
                                                                    required/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row mt-1'>
                                                    <div className='col-sm-6'>
                                                        <h4>email address</h4>
                                                        <p>Enter your email address</p>
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        <div className='form-group'>
                                                            <label className='control-label sm-1 ml-3'>
                                                                Email Address    
                                                            </label>
                                                            <div className='col-sm-11'>
                                                                <input type='email'
                                                                    name='email'
                                                                    class='form-control'
                                                                    placeholder='johndoe@hotmail.com'
                                                                    onChange={e => onChange(e)}
                                                                    value={email}
                                                                    required/>
                                                            </div>               
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row mt-1'>
                                                    <div className='col-sm-6'>
                                                        <h4>phone number</h4>
                                                        <p>Enter your phone number</p>
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        <div className='form-group'>
                                                            <label className='control-label sm-1 ml-3'>
                                                                Phone number   
                                                            </label>
                                                            <div className='col-sm-11'>
                                                                <input type='tel'
                                                                    name='tel'
                                                                    class='form-control'
                                                                    placeholder='+2348031284857'
                                                                    onChange={e => onChange(e)}
                                                                    value={phone_number}
                                                                    required/>
                                                            </div>               
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row mt-1'>
                                                    <div className='col-sm-6'>
                                                        <h4>gender</h4>
                                                        <p>What is your gender?</p>
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        <div className='form-group'>
                                                            <label className='control-label sm-1 ml-3'>
                                                                Gender   
                                                            </label>
                                                            <div className='col-sm-11'>
                                                                <input type='text'
                                                                    name='gender'
                                                                    class='form-control'
                                                                    placeholder='Male/Female/Other'
                                                                    onChange={e => onChange(e)}
                                                                    value={gender}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row mt-1'>
                                                    <div className='col-sm-6'>
                                                        <h4>date of birth</h4>
                                                        <p>What is your date of birth?</p>
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        <div className='form-group'>
                                                            <label className='control-label sm-1 ml-3'>
                                                                Date of birth  
                                                            </label>
                                                            <div className='col-sm-11'>
                                                                <input type='date'
                                                                    name='date'
                                                                    class='form-control'
                                                                    onChange={e => onChange(e)}
                                                                    value={date_of_birth}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row mt-1'>
                                                    <div className='col-sm-6'></div>
                                                    <div className='col-sm-6'>
                                                        <div className='form-group'>
                                                            <div className='sm-1'></div>
                                                            <div className='col-sm-11'>
                                                                <button type='submit'
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
    { userProfileDetails,
      fetchProfile,
      logout }
  )(Profile);