import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { showLoginAlert, logout } from '../../actions/auth';
import moment from 'moment';
import {
  addItem,
  getItems,
  deleteItem,
  deleteSelectedItems,
  editItem
} from '../../actions/item';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
import './Dashboard.css';
import {
  getWeeklyExpense,
  getMonthlyExpense,
  getYearlyExpense,
  getExpenseReport
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
  deleteItem,
  deleteSelectedItems,
  getExpenseReport,
  editItem
}) => {
  const { isAuthenticated, user, profile } = auth;
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

  const [filters, setFilters] = useState({
    nameFilter: '',
    descriptionFilter: '',
    minimumPriceFilter: 0,
    maximumPriceFilter: Infinity
    //itemsToFilter: items
  });

  const onFilterChange = e => {
    if (e.target.name.includes('PriceFilter') && e.target.value === '') {
      if (e.target.name === 'minimumPriceFilter') {
        setFilters({ ...filters, [e.target.name]: 0 });
      } else if (e.target.name === 'maximumPriceFilter') {
        setFilters({ ...filters, [e.target.name]: Infinity });
      }
    } else {
      setFilters({ ...filters, [e.target.name]: e.target.value });
    }
  };

  const dashboardStyles = {
    navbar: { marginLeft: '0px', opacity: '1.5', backgroundColor: '#022ec1' },
    list: { color: 'white' },
    nav_link: { color: 'white' },
    py: { paddingTop: '140px' },
    expns: { marginLeft: '1px' },
    msg: {
      fontSize: '30px',
      fontFamily: "'Raleway'",
      display: 'flex',
      color: '#000000',
      textAlign: 'left',
      fontWeight: 'bold',
      marginLeft: '-5%'
    },
    expenses: { cursor: 'pointer' },
    dropNav: { boxShadow: '0 0 5px 0.5px rgb(39, 38, 38)' },
    budget_hover: { cursor: 'pointer' },
    expenseBtn: { background: '#022ec1', color: '#ffff' },
    budgetBtn: { background: '#022ec1', color: '#ffff' },
    specifyBtn: { background: '#022ec1', color: '#ffff' },
    exportBtn: { background: '#022ec1', color: '#ffff' },
    excelBtn: { border: '0.5px inset #373737' },
    expenseCat: { fontSize: '80%' },
    budgetScheme: { fontSize: '80%' },
    budget: {
      backgroundColor: 'white',
      border: '1.5px solid #4bc102',
      color: '#4bc102',
      borderRadius: '5px',
      width: '187px',
      height: '50px',
      fontSize: '0.8em',
      fontWeight: '700'
    },
    col_md_7: { borderRadius: '8px' },
    totalExp_h2: {
      color: 'white',
      marginTop: '10px',
      fontFamily: "'Raleway'"
    },
    total: {
      color: '#ffff',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-evenly'
    },
    big: { fontSize: '160%', fontWeight: '800' },
    medium: { fontSize: '100%', fontWeight: '800' },
    week: {
      display: 'flex',
      flexFlow: 'column wrap',
      justifyContent: 'space-between'
    },
    month: {
      display: 'flex',
      flexFlow: 'column wrap',
      justifyContent: 'space-between'
    },
    year: {
      display: 'flex',
      flexFlow: 'column wrap',
      justifyContent: 'space-between'
    },
    track_h2: { color: '#022ec1', fontSize: '170%', fontWeight: '600' },
    period_p: { fontWeight: '700' },
    form_i: { color: '#022ec1' },
    transTable_tbody_td: { border: 'none' },
    transTable_thead_th: { borderTop: 'none' },
    transTable: {
      background: 'rgb(250, 250, 250)',
      boxShadow: '0 2px 2px -2px rgb(39, 38, 38)'
    },
    pages: {
      display: 'flex',
      flexFlow: 'row',
      color: '#022ec1',
      justifyContent: 'space-evenly'
    },
    pages__current: { color: '#ffff', background: '#022ec1' },
    pages__first: { color: 'rgb(209, 207, 207)' },
    pages_a: { paddingBottom: '0em', marginBottom: '-0.3em' },
    pages_p: { paddingBottom: '0em', marginBottom: '-0.3em' },
    expTotal: { padding: '0.5em', borderRadius: '15px' },
    dashboard_table: { tableLayout: 'fixed' },
    dashboard_table_td: { wordWrap: 'break-word' },
    dashboard_table__dashboardAction: {
      borderRadius: '50px',
      backgroundColor: 'transparent',
      borderWidth: '0px'
    },
    dashboard_table__delItemBtn: { background: 'red', fontWeight: '500' },
    dashboard_table_tr_nth_child_even: { backgroundColor: '#f2f2f2' },
    dashboard_table_tr_hover: {
      backgroundColor: 'rgba(117, 117, 117, 0.849)'
    },
    dashboard_table__dashboard_del_icon_hover: { color: 'red' },
    dashboard_table__dashboard_edit_icon_hover: { color: '#022ec1' },
    dashboard_table_th: {
      paddingTop: '12px',
      paddingBottom: '12px',
      textAlign: 'left',
      backgroundColor: '#022ec1',
      color: 'white'
    },
    dashboard_table_input: {
      backgroundColor: 'white',
      border: '1.5px solid #022ec1',
      color: '#022ec1',
      fontSize: '0.8em',
      fontWeight: '700',
      borderRadius: '5px'
    },
    dashboard_table_div_hover__db_filter_btn_clear: {
      margin: '0px',
      padding: '0px',
      transform: 'translateX(-20px)',
      color: 'white',
      fontWeight: '100',
      display: 'inline'
    },
    dashboard_table_button_i: {
      margin: '0px',
      padding: '0px',
      transform: 'translateX(-20px)',
      color: '#022ec1',
      fontWeight: '100',
      display: 'block'
    },
    dashboard_table_i: {
      margin: '0px',
      padding: '0px',
      transform: 'translateX(-20px)',
      color: '#022ec1',
      background: 'transparent',
      borderRadius: '50px',
      display: 'none'
    },
    dashboard_table_i_hover: {
      margin: '0px',
      padding: '0px',
      transform: 'translateX(-20px)',
      color: 'white',
      fontWeight: '100'
    },
    db_delete_selected: {
      backgroundColor: 'white',
      border: '1.5px solid #022ec1',
      color: '#022ec1',
      fontSize: '0.8em',
      fontWeight: '700',
      borderRadius: '5px'
    },
    expens_mini_form: { display: 'flex', flexFlow: 'row wrap' },
    expens_mini_form___div___label: { margin: '2.5px 5px', fontSize: '16px' },
    expens_mini_form___div___input: {
      margin: '2.5px 5px',
      verticalAlign: 'middle',
      padding: '5px 7px',
      color: '#000',
      backgroundColor: '#fff'
    },
    expense_mini_btn: {
      margin: '0 5px',
      padding: '5px 7px',
      width: 'auto',
      height: 'auto',
      fontFamily: "'Raleway', sans-serif",
      color: '#fff',
      backgroundColor: 'red !important',
      marginTop: '29px !important'
    },
    overall: { margin: '1.5em' },
    exp_head: { display: 'flex', justifyContent: 'space-between' },
    exp_head_text: {
      fontWeight: '750',
      fontSize: '22px',
      marginTop: '0.2em'
    },
    p: {
      lineHeight: '16px',
      fontSize: '15px',
      color: '#000',
      fontWeight: '500px'
    },
    section_expense_details_div_p: {
      fontSize: '13px',
      lineHeight: '14px',
      color: '#373737'
    },
    expense_details: {
      marginTop: '2em',
      display: 'flex',
      justifyContent: 'space-between'
    },
    exp_person_name: {
      fontWeight: '600',
      fontSize: '24px',
      lineHeight: '28px',
      textTransform: 'uppercase',
      color: '#022CE1'
    },
    budget_head_h5: {
      fontWeight: '500',
      color: '#022CE1',
      fontSize: '18px',
      lineHeight: '21px',
      display: 'flex',
      justifyContent: 'flex-end'
    },
    budget_head_p_span: {
      display: 'inline-block',
      margin: '0em 0em 0em 1em'
    },
    line_hr: { border: '0.5px solid #022CE1', margin: '0.5em' },
    table: {
      width: '100%',
      background: '#fcfcfc',
      border: '0.25px solid #022CE1',
      boxShadow: '0px 1px 1px rgba((0), 0, 0, 0.25)',
      margin: '1.5em auto 1em auto',
      padding: '2em'
    },
    th: { textAlign: 'center', padding: '0.3rem' },
    td: { textAlign: 'center', padding: '0.3rem' },
    exp_bottom: { marginTop: '1.5em' },
    exp_bottom_h5: {
      fontSize: '18px',
      fontWeight: '500',
      lineHeight: '21px',
      color: '#022CE1'
    },
    exp_bottom_p: {
      width: '500px',
      fontSize: '18px',
      lineHeight: '21px',
      color: '#373737'
    },
    end_footer: { position: 'absolute', bottom: '0' },
    footer_text: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  };
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
                <Link to='/userProfile' className='dropdown-item'
                  style={{ margin: '0px auto', textAlign: 'center' }}>
                  <i className='fas fa-cog' /> Profile
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
              <h1 className='msg'>
                Keep track of your expenses over an extended period of time{' '}
              </h1>
              <span>
                <button
                  id='expns'
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
              className='form-inline col-md-12'
              style={{
                marginLeft: '0px',
                paddingLeft: '0px'
              }}>
              <div
                className='form-group col-md-4'
                style={{
                  marginLeft: '0px',
                  paddingLeft: '0px'
                }}>
                <label className='mr-1 medium'>Start Date</label>
                <input
                  style={{
                    width: '100%'
                  }}
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
              <div
                className='form-group col-md-4'
                style={{
                  marginLeft: '0px',
                  paddingLeft: '0px'
                }}>
                <label className='mr-1 medium'>End Date</label>
                <input
                  style={{
                    width: '100%'
                  }}
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
          <div>
            <div className='row'>
              <div className='col-md-2 form-group'>
                <label htmlFor='item'>Item Name</label>
                <input
                  className='form-control'
                  type='text'
                  name='nameFilter'
                  onChange={e => {
                    onFilterChange(e);
                  }}
                  placeholder='Filter by Item name..'
                />
              </div>
              <div className='col-md-2 form-group'>
                <label htmlFor='description'>Description</label>
                <input
                  className='form-control'
                  type='text'
                  name='descriptionFilter'
                  onChange={e => {
                    onFilterChange(e);
                  }}
                  placeholder='Filter by Item description..'
                />
              </div>
              <div className='col-md-2 form-group'>
                <label htmlFor='minimumPriceFilter'>Min Amount</label>
                <input
                  className='form-control'
                  name='minimumPriceFilter'
                  type='number'
                  onChange={e => {
                    onFilterChange(e);
                  }}
                  placeholder='Minimum..'
                />
              </div>
              <div className='col-md-2 form-group'>
                <label htmlFor='maximumPriceFilter'>Max Amount</label>
                <input
                  className='form-control'
                  name='maximumPriceFilter'
                  type='number'
                  onChange={e => {
                    onFilterChange(e);
                  }}
                  placeholder='Maximum..'
                />
              </div>

              <div className='col-md-2 form-group'>
                <button
                  class='btn btn-lg expense-mini-btn'
                  type='button'
                  onClick={() => {
                    let selectedItemsId = Array.from(
                      document.getElementsByClassName('db-item-checkbox')
                    )
                      .filter(checkBox => checkBox.checked === true)
                      .map(checkBox => {
                        return checkBox.getAttribute('data-id');
                      });

                    deleteSelectedItems(userId, selectedItemsId);
                  }}>
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
          <div className='row ml-1 mt-3'>
            <table className='table transTable col-sm-12 dashboard-table'>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Description </th> <th> Amount</th>
                  <th>Actions</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {items === null ||
                items === undefined ||
                items.items === null ||
                items.items === undefined
                  ? null
                  : items.items
                      .filter(item =>
                        item.name
                          .toLowerCase()
                          .includes(filters.nameFilter.toLowerCase())
                      )
                      .filter(item =>
                        item.description
                          .toLowerCase()
                          .includes(filters.descriptionFilter.toLowerCase())
                      )
                      .filter(
                        item =>
                          item.amount >= filters.minimumPriceFilter &&
                          item.amount <= filters.maximumPriceFilter
                      )
                      .map((item, index) => {
                        return (
                          <tr key={item === undefined ? null : item._id}>
                            <td>
                              {item === undefined
                                ? null
                                : formatDate(item.date)}
                            </td>
                            <td>{item === undefined ? null : item.name}</td>
                            <td>
                              {item === undefined ? null : item.description}
                            </td>
                            <td>{item === undefined ? 0 : item.amount}</td>
                            <td>
                              <button className='dashboardAction'>
                                <i
                                  className='fa fa-trash dashboard-del-icon'
                                  data-toggle='modal'
                                  data-target={'#deleteItem' + index}
                                  aria-hidden='true'
                                />
                              </button>
                              <div
                                className='modal fade'
                                role='dialog'
                                id={'deleteItem' + index}>
                                <div className='modal-dialog'>
                                  <div className='modal-content'>
                                    <div className='modal-body'>
                                      <h1
                                        style={{
                                          color: '#022EC1'
                                        }}
                                        className='ml-3'>
                                        Delete Item
                                      </h1>

                                      <div className='col-sm-11'>
                                        Are you sure you want to delete,this
                                        action is irreversible
                                      </div>
                                      <div className='form-group'>
                                        <div className='col-sm-11'>
                                          <button
                                            onClick={() => {
                                              deleteItem(userId, item._id);
                                            }}
                                            data-toggle='modal'
                                            data-target={'#deleteItem' + index}
                                            className='btn form-control delItemBtn'>
                                            Delete Item
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <button
                                className='dashboardAction'
                                onClick={() => {
                                  document.getElementsByClassName(
                                    'description' + index
                                  )[0].value = item.description;
                                  setFormData({
                                    ...formData,
                                    name: item.name,
                                    description: item.description,
                                    amount: item.amount,
                                    date: moment(item.date).format('YYYY-MM-DD')
                                  });

                                  document.getElementsByClassName(
                                    'name' + index
                                  )[0].value = item.name;

                                  document.getElementsByClassName(
                                    'amount' + index
                                  )[0].value = item.amount;
                                  document.getElementsByClassName(
                                    'date' + index
                                  )[0].value = moment(item.date).format(
                                    'YYYY-MM-DD'
                                  );
                                }}
                                data-toggle='modal'
                                data-target={'#editExpense' + index}>
                                <i
                                  className='fa fa-pencil-square-o dashboard-edit-icon'
                                  aria-hidden='true'
                                />
                              </button>
                              <div
                                id={'editExpense' + index}
                                className='modal fade'
                                role='dialog'>
                                <div className='modal-dialog'>
                                  <div className='modal-content'>
                                    <div className='modal-body'>
                                      <h1
                                        style={{
                                          color: '#022EC1'
                                        }}
                                        className='ml-3'>
                                        Edit Expense
                                      </h1>
                                      <form
                                        onSubmit={e => {
                                          e.preventDefault();
                                          editItem(
                                            name,
                                            description,
                                            amount,
                                            date,
                                            userId,
                                            item._id
                                          );
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
                                              // value={item.name}
                                              onChange={e => onChange(e)}
                                              //id='expenseName'
                                              className={
                                                'form-control name' + index
                                              }
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
                                              // value={
                                              //   item.description
                                              // }
                                              onChange={e => onChange(e)}
                                              //id='expenseDescription'
                                              className={
                                                'form-control description' +
                                                index
                                              }
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
                                              // value={item.amount}
                                              onChange={e => onChange(e)}
                                              //id='expenseAmount'
                                              className={
                                                'form-control amount' + index
                                              }
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
                                              // value={moment(item.date).format(
                                              //   'YYYY-MM-DD'
                                              // )}
                                              onChange={e => onChange(e)}
                                              className={
                                                'form-control mr-1 specify date' +
                                                index
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className='form-group'>
                                          <div className='sm-1' />
                                          <div className='col-sm-11'>
                                            <button
                                              type='submit'
                                              data-toggle='modal'
                                              data-target={
                                                '#editExpense' + index
                                              }
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
                            <td>
                              <input
                                className='db-item-checkbox'
                                type='checkbox'
                                data-id={item._id}
                              />
                            </td>
                          </tr>
                        );
                      })}
              </tbody>
            </table>
          </div>

          <div id='content' className='overall' style={{ display: 'none' }}>
            <section className='exp-head' style={dashboardStyles.exp_head}>
              <div>
                <h3
                  className='exp-head-text'
                  style={dashboardStyles.exp_head_text}>
                  Expense Report
                </h3>
                <p>
                  {startDate} to {endDate}
                </p>
              </div>
              <div
                className='exp-head-image'
                style={dashboardStyles.exp_head_image}>
                <img
                  src='https://res.cloudinary.com/busola/image/upload/c_scale,h_35,w_230/v1569398282/Logo_-_dark.png'
                  alt='triptotracker'
                />
              </div>
            </section>
            <section
              className='expense-details'
              style={dashboardStyles.expense_details}>
              <div>
                <p>This report has been prepared for</p>
                <h3
                  className='exp-person-name'
                  style={dashboardStyles.exp_person_name}>
                  {user.username}
                </h3>
              </div>
              <div className='budget-head'>
                <h5>Current Budget</h5>
                <p>
                  <span>Weekly:&nbsp;{weeklyExpense}</span>
                  <span>
                    {' '}
                    {' Monthly'}:&nbsp;{monthlyExpense}
                  </span>
                  <span>
                    {' '}
                    {' Yearly'}:&nbsp;{yearlyExpense}
                  </span>
                </p>
              </div>
            </section>
            <div className='line'>
              <hr />
            </div>
            {/* MAIN SECTION FOR THE TABLE DATA*/}
            <section className='expense-data'>
              <table>
                <tbody className='data-set'>
                  <tr>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Description</th>
                    {/* <th>Quantity</th> */}
                    <th>Amount</th>
                  </tr>
                  {items === null ||
                  items === undefined ||
                  items.items === null ||
                  items.items === undefined
                    ? null
                    : items.items.map(item => {
                        return (
                          <tr key={item._id}>
                            <td
                              style={{
                                padding: '10px'
                              }}>
                              {item === undefined
                                ? null
                                : formatDate(item.date)}
                            </td>
                            <td
                              style={{
                                padding: '10px'
                              }}>
                              {item.name}
                            </td>
                            <td
                              style={{
                                padding: '10px'
                              }}>
                              {item.description}
                            </td>
                            {/* <td style={{
                            padding:"10px"
                          }}>1 Unit</td> */}
                            <td
                              style={{
                                padding: '10px'
                              }}>
                              N {item.amount}
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </section>
          </div>
          <div id='editor' />
          <button
            className='btn'
            onClick={() => {
              let content = document.getElementById('content');
              getExpenseReport(content.innerHTML, userId);
            }}
            style={{
              color: 'white',
              backgroundColor: '#022ec1'
            }}
            id='elementH'>
            Expense Report
          </button>
        </div>
      </section>
    </>
  );
};

// Accepts a Date object or date string that is recognized by the Date.parse() method
const formatDate = date => {
  var item_date = new Date(date);
  const ddd = isNaN(item_date.getDay())
    ? null
    : [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ][item_date.getDay()];
  const mmm = isNaN(item_date.getMonth())
    ? null
    : [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ][item_date.getMonth()];
  return (
    ddd +
    ' ' +
    item_date.getDate() +
    nth(item_date.getDate()) +
    ' ' +
    mmm +
    ' ' +
    item_date.getFullYear()
  );
};

const nth = d => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

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
    deleteItem,
    deleteSelectedItems,
    getExpenseReport,
    editItem
  }
)(Dashboard);
