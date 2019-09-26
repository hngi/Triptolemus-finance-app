import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
const Landing = () => {
  return (
    <section id='info' className='py-'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 align-self-center'>
            <p className='msg ml-5'>
              A whole new way to manage your spending
            </p>
            <ul>
              <li className='ml-5 list'>know how you spend</li>
              <li className='ml-5 list'>Manage your finances</li>
            </ul>
            <Link to='.register' className='nav-link'>
              <button className='btn-signup ml-3'>Sign up for free</button>
            </Link>
          </div>
          <div className='col-md-6'>
            <img
              src='https://res.cloudinary.com/busola/image/upload/v1569521208/charts.jpg'
              alt='logo'
              className='img-fluid'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
