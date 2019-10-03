import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { showLoginAlert, logout } from '../../actions/auth';
import { addItem, getItems, deleteItem } from '../../actions/item';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';

import './Dashboard.css';
import {
  getWeeklyExpense,
  getMonthlyExpense,
  getYearlyExpense
} from '../../actions/expense';
import {
  setWeeklyBudget,
  setMonthlyBudget,
  setYearlyBudget
} from '../../actions/budget';
import { fetchProfile } from '../../actions/auth';
const Dashboard = ({
  showLoginAlert,
  logout,
  auth,
  expense,
  addItem,
  history,
  getWeeklyExpense,
  getMonthlyExpense,
  getYearlyExpense,
  setWeeklyBudget,
  setMonthlyBudget,
  setYearlyBudget,
  fetchProfile,
  getItems,
  items,
  loading,
  deleteItem
}) => {
  const { isAuthenticated, user, profile } = auth;
  console.log(auth.isSignedInWithGoogle);
  const { weeklyExpense, monthlyExpense, yearlyExpense } = expense;
  useEffect(() => {
    if (
      isAuthenticated == null ||
      !isAuthenticated ||
      user == null ||
      !user ||
      items == null ||
      !items ||
      profile == null ||
      !profile ||
      !expense == null ||
      !expense
    ) {
      return;
    }
    const userId = auth.user.id;
    fetchProfile(userId);
    getWeeklyExpense(userId);
    getMonthlyExpense(userId);
    getYearlyExpense(userId);
  }, [fetchProfile]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    budget: '',
    duration: 'Weekly',
    date: '',
    startDate: '',
    endDate: ''
  });

  if (isAuthenticated == null || !isAuthenticated || user == null || !user) {
    showLoginAlert('You need to be logged in to do that', 'danger', history);
    return <Redirect to='/login' />;
  }
  const {
    name,
    description,
    amount,
    budget,
    duration,
    date,
    startDate,
    endDate
  } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const userId = auth.user.id;

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
                {/* <Link to='/' className='dropdown-item'>
                  <i className='fas fa-cog' /> Settings
                </Link> */}
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <section id='info' className='py-'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-5 align-self-center'>
              <h1 className='msg'>
                Keep track of your expenses over an extended period of time{' '}
              </h1>
              <span>
                <button
                  className='expenses mr-3'
                  data-toggle='modal'
                  data-target='#addExpense'>
                  Add Expense
                </button>
                <div id='addExpense' className='modal fade' role='dialog'>
                  <div className='modal-dialog'>
                    <div className='modal-content'>
                      <div className='modal-body'>
                        <h1 style={{ color: '#022EC1' }} className='ml-3'>
                          Add Expense
                        </h1>
                        <form
                          onSubmit={e => {
                            e.preventDefault();
                            addItem(name, description, amount, date, userId);
                          }}
                          className='form-horizontal'>
                          <div className='form-group'>
                            <label className='control-label sm-1 ml-3'>
                              Item Name
                            </label>
                            <div className='col-sm-11'>
                              <input
                                required
                                type='text'
                                name='name'
                                value={name}
                                onChange={e => onChange(e)}
                                id='expenseName'
                                className='form-control'
                                placeholder='Enter Item Name'
                              />
                            </div>
                          </div>
                          <div className='form-group'>
                            <label className='control-label sm-1 ml-3'>
                              Item Description
                            </label>
                            <div className='col-sm-11'>
                              <input
                                required
                                type='text'
                                name='description'
                                value={description}
                                onChange={e => onChange(e)}
                                id='expenseDescription'
                                className='form-control'
                                placeholder='Enter Item Description'
                              />
                            </div>
                          </div>

                          <div className='form-group'>
                            <label className='control-label sm-1 ml-3'>
                              Amount
                            </label>
                            <div className='col-sm-11'>
                              <input
                                required
                                type='number'
                                name='amount'
                                value={amount}
                                onChange={e => onChange(e)}
                                id='expenseAmount'
                                className='form-control'
                                placeholder='Enter Amount'
                              />
                            </div>
                          </div>
                          <div className='form-group'>
                            <label className='control-label sm-1 ml-3'>
                              Date of purchase
                            </label>
                            <div className='col-sm-11'>
                              <input
                                required
                                type='date'
                                name='date'
                                id='date'
                                value={date}
                                onChange={e => onChange(e)}
                                className='form-control mr-1 specify'
                              />
                            </div>
                          </div>
                          <div className='form-group'>
                            <div className='sm-1' />
                            <div className='col-sm-11'>
                              <button
                                type='submit'
                                data-toggle='modal'
                                data-target='#addExpense'
                                className='btn form-control expenseBtn'>
                                Record Expense
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className='budget mt-2'
                  data-toggle='modal'
                  data-target='#setBudget'>
                  Set Budget
                </button>
                <div className='modal fade' role='dialog' id='setBudget'>
                  <div className='modal-dialog'>
                    <div className='modal-content'>
                      <div className='modal-body'>
                        <h1 style={{ color: '#022EC1' }} className='ml-3'>
                          Set Budget
                        </h1>
                        {/* <p className='budgetScheme ml-3'>
                          Setup Budget Scheme
                        </p> */}
                        <form
                          onSubmit={e => {
                            e.preventDefault();
                            if (duration === 'Weekly') {
                              setWeeklyBudget(duration, budget, userId);
                            } else if (duration === 'Monthly') {
                              setMonthlyBudget(duration, budget, userId);
                            } else if (duration === 'Yearly') {
                              setYearlyBudget(duration, budget, userId);
                            }
                          }}
                          className='form-horizontal'>
                          <div className='form-group'>
                            <label className='control-label sm-1 ml-3'>
                              Duration
                            </label>
                            <div className='col-sm-11'>
                              <select
                                name='duration'
                                id='budgetDuration'
                                className='form-control'
                                value={duration}
                                onChange={e => onChange(e)}>
                                <option name='weekly' className='expenseCat'>
                                  Weekly
                                </option>
                                <option name='monthly' className='expenseCat'>
                                  Monthly
                                </option>
                                <option name='yearly' className='expenseCat'>
                                  Yearly
                                </option>
                              </select>
                            </div>
                          </div>
                          <div className='form-group'>
                            <label className='control-label sm-1 ml-3'>
                              Budget
                            </label>
                            <div className='col-sm-11'>
                              <input
                                required
                                type='number'
                                name='budget'
                                value={budget}
                                onChange={e => onChange(e)}
                                id='budgetDuration'
                                className='form-control'
                                placeholder='Enter Budget'
                              />
                            </div>
                          </div>
                          <div className='form-group'>
                            <div className='sm-1' />
                            <div className='col-sm-11'>
                              <button
                                type='submit'
                                data-toggle='modal'
                                data-target='#setBudget'
                                className='btn form-control budgetBtn'>
                                Set Budget
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            </div>
            <div
              className='col-md-7 totalExp mt-2'
              style={{ backgroundColor: '#022EC1' }}>
              <h2>Your Budget</h2>
              <div className='total'>
                <div className='week'>
                  <p className='big'>
                    ₦{' '}
                    <span className='big'>
                      {profile.weekly_budget === undefined
                        ? 0
                        : profile.weekly_budget}
                    </span>
                  </p>
                  <p className='small'>
                    Weekly
                    {/* <span className='bg-success expTotal'>
                      <i className='fa fa-arrow-up' /> 500
                    </span> */}
                  </p>
                </div>
                <div className='month'>
                  <p className='big'>
                    ₦{' '}
                    <span className='big'>
                      {profile.monthly_budget === undefined
                        ? 0
                        : profile.monthly_budget}
                    </span>
                  </p>
                  <p className='small'>
                    Monthly
                    {/* <span className='bg-danger expTotal'>
                      <i className='fa fa-arrow-up' /> 500
                    </span> */}
                  </p>
                </div>
                <div className='year'>
                  <p className='big'>
                    ₦{' '}
                    <span className='big'>
                      {profile.yearly_budget === undefined
                        ? 0
                        : profile.yearly_budget}
                    </span>
                  </p>
                  <p className='small'>
                    Yearly
                    {/* <span className='bg-success expTotal'>
                      <i className='fa fa-arrow-down' /> 1000
                    </span> */}
                  </p>
                </div>
              </div>
              <h2>Your Total Expenses</h2>
              <div className='total'>
                <div className='week'>
                  <p className='big'>
                    ₦{' '}
                    <span className='big'>
                      {weeklyExpense === undefined ? 0 : weeklyExpense}
                    </span>
                  </p>
                  <p className='small'>
                    This Week
                    {/* <span className='bg-success expTotal'>
                      <i className='fa fa-arrow-up' /> 500
                    </span> */}
                  </p>
                </div>
                <div className='month'>
                  <p className='big'>
                    ₦{' '}
                    <span className='big'>
                      {monthlyExpense === undefined ? 0 : monthlyExpense}
                    </span>
                  </p>
                  <p className='small'>
                    This Month
                    {/* <span className='bg-danger expTotal'>
                      <i className='fa fa-arrow-up' /> 500
                    </span> */}
                  </p>
                </div>
                <div className='year'>
                  <p className='big'>
                    ₦{' '}
                    <span className='big'>
                      {yearlyExpense === undefined ? 0 : yearlyExpense}
                    </span>
                  </p>
                  <p className='small'>
                    This Year
                    {/* <span className='bg-success expTotal'>
                      <i className='fa fa-arrow-down' /> 1000
                    </span> */}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='row mt-4 track ml-1'>
            <h2>Track your expenses</h2>
          </div>
          <div className='row ml-1 period'>
            <p>Specify Period</p>
          </div>
          <div className='row ml-1'>
            <form
              onSubmit={e => {
                e.preventDefault();
                getItems(startDate, endDate, userId);
              }}
              className='form-inline col-md-12'>
              <div className='form-group col-md-4'>
                <label className='mr-1 medium'>Start Date</label>
                <input
                  required
                  type='date'
                  name='startDate'
                  id='startDate'
                  value={startDate}
                  onChange={e => onChange(e)}
                  className='form-control mr-5 specify'
                />
                {/* <i className='fa fa-calendar-alt mr-3' /> */}
              </div>
              <div className='form-group col-md-4'>
                <label className='mr-1 medium'>End Date</label>
                <input
                  required
                  type='date'
                  name='endDate'
                  id='endDate'
                  value={endDate}
                  onChange={e => onChange(e)}
                  className='form-control mr-5 specify'
                />
                {/* <i className='fa fa-calendar-alt mr-3' /> */}
              </div>
              <div className='form-group col-md-4'>
                <button
                  type='submit'
                  className='btn form-control specifyBtn pl-5 pr-5 specify mb-1'>
                  {loading ? (
                    <i className='fa fa-circle-o-notch text-white spin-loader' />
                  ) : null}
                  Generate
                </button>
              </div>
            </form>
          </div>

          <div className='row ml-1 mt-3'>
            <table className='table transTable col-sm-12 dashboard-table'>
              <thead>
                <tr>
                  <th>Transaction Date</th>
                  <th>Item</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items === null || items.items === undefined
                  ? null
                  : items.items.map((item,index) => {
                    return (
                      <tr key={item === undefined ? null : item._id}>
                        <td>{item === undefined ? null : formatDate(item.date)}</td>
                        <td>{item === undefined ? null : item.name}</td>
                        <td>
                          {item === undefined ? null : item.description}
                        </td>
                        <td>{item === undefined ? 0 : item.amount}</td>
                        <td>
                          <button className="dashboardAction"><i className="fa fa-trash dashboard-del-icon" data-toggle='modal'
                            data-target={'#deleteItem'+index} aria-hidden="true" /></button>
                          <div className='modal fade' role='dialog' id={'deleteItem'+index}>
                            <div className='modal-dialog'>
                              <div className='modal-content'>
                                <div className='modal-body'>
                                  <h1 style={{ color: '#022EC1' }} className='ml-3'>
                                    Delete Item
                        </h1>

                                  <div className='col-sm-11'>Are you sure you want to delete,this action is irreversible</div>
                                  <div className='form-group'>

                                    <div className='col-sm-11'>
                                      <button
                                      onClick={()=>{
                                        deleteItem(userId, item._id);
                                      }}
                                        data-toggle='modal'
                                        data-target={'#deleteItem'+index}
                                        className='btn form-control delItemBtn'>
                                        Delete Item
                              </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>


                          <button className="dashboardAction" data-toggle='modal'
                            data-target={'#editExpense'+index}><i className="fa fa-pencil-square-o dashboard-edit-icon" aria-hidden="true" />
                          </button>
                          <div id={'editExpense' + index} className='modal fade' role='dialog'>
                            <div className='modal-dialog'>
                              <div className='modal-content'>
                                <div className='modal-body'>
                                  <h1 style={{ color: '#022EC1' }} className='ml-3'>
                                    Edit Expense
                                  </h1>
                                  <form
                                    onSubmit={e => {
                                      e.preventDefault();
                                    }}
                                    className='form-horizontal'>
                                    <div className='form-group'>
                                      <label className='control-label sm-1 ml-3'>
                                        Item Name
                            </label>
                                      <div className='col-sm-11'>
                                        <input
                                          required
                                          type='text'
                                          name='name'
                                          value={item.name}
                                          onChange={e => onChange(e)}
                                          //id='expenseName'
                                          className='form-control'
                                          placeholder='Enter Item Name'
                                        />

                                      </div>
                                    </div>
                                    <div className='form-group'>
                                      <label className='control-label sm-1 ml-3'>
                                        Item Description
                            </label>
                                      <div className='col-sm-11'>
                                        <input
                                          required
                                          type='text'
                                          name='description'
                                          value={item.description}
                                          onChange={e => onChange(e)}
                                          //id='expenseDescription'
                                          className='form-control'
                                          placeholder='Enter Item Description'
                                        />
                                      </div>
                                    </div>

                                    <div className='form-group'>
                                      <label className='control-label sm-1 ml-3'>
                                        Amount
                            </label>
                                      <div className='col-sm-11'>
                                        <input
                                          required
                                          type='number'
                                          name='amount'
                                          value={item.amount}
                                          onChange={e => onChange(e)}
                                          //id='expenseAmount'
                                          className='form-control'
                                          placeholder='Enter Amount'
                                        />
                                      </div>
                                    </div>
                                    <div className='form-group'>
                                      <label className='control-label sm-1 ml-3'>
                                        Date of purchase
                            </label>
                                      <div className='col-sm-11'>
                                        <input
                                          required
                                          type='date'
                                          name='date'
                                          //id='date'
                                          value={item.date}
                                          onChange={e => onChange(e)}
                                          className='form-control mr-1 specify'
                                        />
                                      </div>
                                    </div>
                                    <div className='form-group'>
                                      <div className='sm-1' />
                                      <div className='col-sm-11'>
                                        <button
                                          type='submit'
                                          data-toggle='modal'
                                          data-target={'#deleteItem'+index}
                                          className='btn form-control expenseBtn'>
                                          Save Expense
                              </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>

                        </td>
                        {/* <td><input type="checkbox" /></td> */}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};
// Accepts a Date object or date string that is recognized by the Date.parse() method
const formatDate = (date) => {
  var item_date = new Date(date);
  console.log(date)
  const ddd = isNaN(item_date.getDay()) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][item_date.getDay()];
  const mmm = isNaN(item_date.getMonth()) ? null:['Jan','Feb', 'Mar', 'Apr', 'May','Jun','Jul','Aug','Sep', 'Oct', 'Nov','Dec'][item_date.getMonth()]
  return ddd + " " + item_date.getDate()+nth(item_date.getDate()) + " "+ mmm + " " + item_date.getFullYear()
}

const nth = (d) => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  expense: state.expense,
  items: state.item.items,
  loading: state.item.loading
});
export default connect(
  mapStateToProps,
  {
    showLoginAlert,
    addItem,
    getWeeklyExpense,
    getMonthlyExpense,
    getYearlyExpense,
    setWeeklyBudget,
    setMonthlyBudget,
    setYearlyBudget,
    fetchProfile,
    getItems,
    logout,
    deleteItem
  }
)(Dashboard);
