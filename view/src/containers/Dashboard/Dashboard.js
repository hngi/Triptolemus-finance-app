import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { showLoginAlert } from '../../actions/auth';
import { addItem } from '../../actions/item';
import { connect } from 'react-redux';
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
  fetchProfile
}) => { 
  
  const { isAuthenticated, user, profile } = auth;
  const { weeklyExpense, monthlyExpense, yearlyExpense } = expense;
  useEffect(() => {
    if (isAuthenticated == null || !isAuthenticated || user == null || !user) {
      
    } else{
    const userId = auth.user.id;
    fetchProfile(userId);
    // getWeeklyExpense(userIdd);
    // getMonthlyExpense(userIdd);
    // getYearlyExpense(userIdd);
  }} ,
  [
    auth,
    // getWeeklyExpense,
    // getMonthlyExpense,
    // getYearlyExpense,
    // auth.user,
    // fetchProfile,
  ]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    budget:'',
    duration: 'Weekly',
    date: '',
    startDate: '',
    endDate: ''
  });
 
  // console.log(monthlyExpense.items)
  // console.log(expense)
  if (isAuthenticated == null || !isAuthenticated || user == null || !user) {
    showLoginAlert('You need to be logged in to do that', 'danger',history);
    return <Redirect to="/login" />
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
  const userId = auth.user.id

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
                <Link to='/login' className='dropdown-item' style={{margin:"0px auto",textAlign:"center"}}>
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
                Calculate How You Have Spent Your Money So Far
              </h1>
              <span>
                <button
                  className='expenses mr-3'
                  data-toggle='modal'
                  data-target='#addExpense'>
                  Record your expenses
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
                            addItem(
                              name,
                              description,
                              amount,
                              date,
                              userId,
                              history
                            );
                            // document.getElementById("addExpenseEffect").click()
                            // let addExpense = document.getElementById('addExpense')
                            // addExpense.style.display = "none";
                            // addExpense.style.paddingRight = null;
                            // addExpense.classList.remove("show");
                            // addExpense.setAttribute("aria-hidden",true)
                            // addExpense.removeAttribute("aria-modal")
                            // document.getElementsByTagName("body")[0].removeChild(document.getElementsByClassName('modal-backdrop')[0])
                            // document.body.classList.remove("modal-open")
                            // document.body.style.paddingRight = "34px";
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
                                data-toggle="modal"
                                data-target="#addExpense"
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
                              console.log("weekly should runnow")
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
                                data-toggle="modal"
                                data-target="#setBudget"
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
                    ₦ <span className='big'>{profile.weekly_budget ==undefined?0:profile.weekly_budget}</span>
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
                    ₦ <span className='big'>{profile.monthly_budget==undefined?0:profile.monthly_budget}</span>
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
                    ₦ <span className='big'>{profile.yearly_budget==undefined?0:profile.yearly_budget}</span>
                  </p>
                  <p className='small'>
                    Yearly
                    {/* <span className='bg-success expTotal'>
                      <i className='fa fa-arrow-down' /> 1000
                    </span> */}
                  </p>
                </div>
              </div>
              <h2>Total Expenses</h2>
              <div className='total'>
                <div className='week'>
                  <p className='big'>
                    ₦ <span className='big'>{weeklyExpense==undefined?0:weeklyExpense.totalExpenses}</span>
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
                    ₦ <span className='big'>{monthlyExpense==undefined?0:monthlyExpense.total}</span>
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
                    ₦ <span className='big'>{yearlyExpense==undefined?0:yearlyExpense.totalExpenses}</span>
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
            <h2>Expense Tracking</h2>
          </div>
          <div className='row ml-1 period'>
            <p>Specify Period</p>
          </div>
          <div className='row ml-1'>
            <form className='form-inline'>
              <div className='form-group'>
                <label className='mr-2'>Start Date</label>
                <input
                  required
                  type='date'
                  name='startDate'
                  id='startDate'
                  value={startDate}
                  onChange={e => onChange(e)}
                // className='form-control mr-1 specify'
                />
                {/* <i className='fa fa-calendar-alt mr-3' /> */}
              </div>
              <div className='form-group'>
                <label className='mr-2'>End Date</label>
                <input
                  required
                  type='date'
                  name='endDate'
                  id='endDate'
                  value={endDate}
                  onChange={e => onChange(e)}
                  className='form-control mr-1 specify'
                />
                {/* <i className='fa fa-calendar-alt mr-3' /> */}
              </div>
              <div className='form-group'>
                <button
                  type='submit'
                  className='btn form-control specifyBtn pl-5 pr-5 specify'>
                  Generate
                </button>
              </div>
            </form>
          </div>
          <div className='row ml-1 mt-3'>
            <table className='table transTable col-sm-12'>
              <thead>
                <tr>
                  <th>Transaction Date</th>
                  <th>Items</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>02-Sep-2019</td>
                  <td>Toilet Paper</td>
                  <td>Toiletries</td>
                  <td>₦250</td>
                </tr>
                <tr>
                  <td>02-Sep-2019</td>
                  <td>Toilet Paper</td>
                  <td>Toiletries</td>
                  <td>₦250</td>
                </tr>
                <tr>
                  <td>02-Sep-2019</td>
                  <td>Toilet Paper</td>
                  <td>Toiletries</td>
                  <td>₦250</td>
                </tr>
                <tr>
                  <td>02-Sep-2019</td>
                  <td>Toilet Paper</td>
                  <td>Toiletries</td>
                  <td>₦250</td>
                </tr>
                <tr>
                  <td>02-Sep-2019</td>
                  <td>Toilet Paper</td>
                  <td>Toiletries</td>
                  <td>₦250</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='row'>
            <div className='col-sm-10' />
            <div className='col-sm-2 pages'>
              <Link to='/'>
                <i className='fa fa-angle-left first' />
              </Link>
              <Link to='/' className='current pl-2 pr-2'>
                1
              </Link>
              <Link to='/' className='pl-2 pr-2'>
                2
              </Link>
              <Link to='/' className='pl-2 pr-2'>
                3
              </Link>
              <p>.</p>
              <p>.</p>
              <p>.</p>
              <Link to='/' className='pl-2 pr-2'>
                15
              </Link>
              <Link to='/'>
                <i className='fa fa-angle-right' />
              </Link>
            </div>
          </div>
          <div className='row ml-1 mt-3 mb-3'>
            <form className='form-inline'>
              <div className='form-group'>
                <label className='mr-4'>Download Format:</label>
                <button
                  type='submit'
                  className='btn form-control pl-5 pr-5 mr-5 excelBtn dlFormat'
                  value='excel'>
                  Excel
                </button>
              </div>
              <div className='form-group'>
                <button
                  type='submit'
                  className='btn form-control pl-5 pr-5 exportBtn dlFormat'>
                  Export
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  expense: state.expense
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
    fetchProfile
  }
)(Dashboard);
