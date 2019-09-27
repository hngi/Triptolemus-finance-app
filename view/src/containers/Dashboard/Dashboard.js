import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { goToLogin } from '../../actions/auth';
import { connect } from 'react-redux';
import './Dashboard.css';
const Dashboard = ({ goToLogin, auth }) => {
  const { isAuthenticated, user } = auth;
  console.log(auth);
  if (isAuthenticated == null || !isAuthenticated) {
    goToLogin();
  }
  return isAuthenticated == null || !isAuthenticated ? (
    <Redirect to='/login' />
  ) : (
    <div>
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
                <i className='fas fa-user' style={{ color: 'white' }} />
                <span className='list'> {user ? user.username : null} </span>
              </Link>
              <div className='dropdown-menu dropNav'>
                <Link to='/' className='dropdown-item'>
                  <i className='fas fa-user-circle' /> Profile
                </Link>
                <Link to='/' className='dropdown-item'>
                  <i className='fas fa-cog' /> Settings
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <section id='info' className='py-'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-5 align-self-center'>
              <h1 className='msg'>How Have You Spent Your Money So Far</h1>
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
                        <form action method className='form-horizontal'>
                          <div className='form-group'>
                            <label className='control-label sm-1 ml-3' htmlFor>
                              Item Description
                            </label>
                            <div className='col-sm-11'>
                              <input
                                type='text'
                                name
                                id='expenseDescription'
                                className='form-control'
                                placeholder='Enter Item Description'
                              />
                            </div>
                          </div>
                          {/* <div className='form-group'>
                            <label
                              htmlFor='expenseSel'
                              className='control-label sm-1 ml-3'>
                              Category
                            </label>
                            <div className='col-sm-11'>
                              <select
                                name
                                id='expenseSel'
                                className='form-control'>
                                <option value>Select Category</option>
                                <option value className='expenseCat'>
                                  Airtime &amp; Data
                                </option>
                                <option value className='expenseCat'>
                                  Beauty
                                </option>
                                <option value className='expenseCat'>
                                  Cable TV
                                </option>
                                <option value className='expenseCat'>
                                  Celebrations
                                </option>
                                <option value className='expenseCat'>
                                  Chilling
                                </option>
                                <option value className='expenseCat'>
                                  Clothing
                                </option>
                                <option value className='expenseCat'>
                                  Debt Payment
                                </option>
                                <option value className='expenseCat'>
                                  Electronic Appliances
                                </option>
                                <option value className='expenseCat'>
                                  Emergencies
                                </option>
                                <option value className='expenseCat'>
                                  Fees
                                </option>
                                <option value className='expenseCat'>
                                  Food
                                </option>
                                <option value className='expenseCat'>
                                  Fuel
                                </option>
                                <option value className='expenseCat'>
                                  Gifts
                                </option>
                                <option value className='expenseCat'>
                                  Groceries
                                </option>
                                <option value className='expenseCat'>
                                  Health &amp; Finances
                                </option>
                                <option value className='expenseCat'>
                                  Insurance
                                </option>
                                <option value className='expenseCat'>
                                  Laundry
                                </option>
                                <option value className='expenseCat'>
                                  Loans
                                </option>
                                <option value className='expenseCat'>
                                  Medicals
                                </option>
                                <option value className='expenseCat'>
                                  Offerings &amp; Tithe
                                </option>
                                <option value className='expenseCat'>
                                  Others
                                </option>
                                <option value className='expenseCat'>
                                  Rent/Mortgage
                                </option>
                                <option value className='expenseCat'>
                                  Repairs &amp; Maintenance
                                </option>
                                <option value className='expenseCat'>
                                  Savings
                                </option>
                                <option value className='expenseCat'>
                                  Subscriptions
                                </option>
                                <option value className='expenseCat'>
                                  Transport
                                </option>
                                <option value className='expenseCat'>
                                  Travel
                                </option>
                                <option value className='expenseCat'>
                                  Utility Bills
                                </option>
                              </select>
                            </div>
                          </div> */}
                          <div className='form-group'>
                            <label className='control-label sm-1 ml-3' htmlFor>
                              Amount
                            </label>
                            <div className='col-sm-11'>
                              <input
                                type='number'
                                name
                                id='expenseAmount'
                                className='form-control'
                                placeholder='Enter Amount'
                              />
                            </div>
                          </div>
                          <div className='form-group'>
                            <div className='sm-1' />
                            <div className='col-sm-11'>
                              <button
                                type='submit'
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
                        <p className='budgetScheme ml-3'>Setup Budget Scheme</p>
                        <form action method className='form-horizontal'>
                          <div className='form-group'>
                            <label className='control-label sm-1 ml-3' htmlFor>
                              Duration
                            </label>
                            <div className='col-sm-11'>
                              <input
                                type='text'
                                name
                                id='budgetDuration'
                                className='form-control'
                                placeholder='Weekly, Monthly, Yearly'
                              />
                            </div>
                          </div>
                          <div className='form-group'>
                            <label className='control-label sm-1 ml-3' htmlFor>
                              Amount
                            </label>
                            <div className='col-sm-11'>
                              <input
                                type='number'
                                name
                                id='budgetDuration'
                                className='form-control'
                                placeholder='Enter Amount'
                              />
                            </div>
                          </div>
                          <div className='form-group'>
                            <div className='sm-1' />
                            <div className='col-sm-11'>
                              <button
                                type='submit'
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
              <h2>Total Expenses</h2>
              <div className='total'>
                <div className='week'>
                  <p>
                    ₦ <span className='big'>25,000</span>
                  </p>
                  <p className='small'>
                    Week
                    <span className='bg-success expTotal'>
                      <i className='fa fa-arrow-up' /> 500
                    </span>
                  </p>
                </div>
                <div className='month'>
                  <p>
                    ₦ <span className='big'>99,419</span>
                  </p>
                  <p className='small'>
                    Month
                    <span className='bg-danger expTotal'>
                      <i className='fa fa-arrow-up' /> 500
                    </span>
                  </p>
                </div>
                <div className='year'>
                  <p>
                    ₦ <span className='big'>997,000</span>
                  </p>
                  <p className='small'>
                    Year
                    <span className='bg-success expTotal'>
                      <i className='fa fa-arrow-down' /> 1000
                    </span>
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
            <form action method className='form-inline'>
              <div className='form-group'>
                <label htmlFor className='mr-2'>
                  Start Date
                </label>
                <input
                  type='date'
                  name='date'
                  id
                  className='form-control mr-1 specify'
                />
                <i className='fa fa-calendar-alt mr-3' />
              </div>
              <div className='form-group'>
                <label htmlFor className='mr-2'>
                  End Date
                </label>
                <input
                  type='date'
                  name='date'
                  id
                  className='form-control mr-1 specify'
                />
                <i className='fa fa-calendar-alt mr-3' />
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
              <p className>.</p>
              <p className>.</p>
              <p className>.</p>
              <Link to='/' className='pl-2 pr-2'>
                15
              </Link>
              <Link to='/'>
                <i className='fa fa-angle-right' />
              </Link>
            </div>
          </div>
          <div className='row ml-1 mt-3 mb-3'>
            <form action method className='form-inline'>
              <div className='form-group'>
                <label htmlFor className='mr-4'>
                  Download Format:
                </label>
                <button
                  type
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
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { goToLogin }
)(Dashboard);
