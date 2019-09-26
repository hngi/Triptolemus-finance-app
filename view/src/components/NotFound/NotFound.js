import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'
const NotFound = () => {
  return (
    <div className='page-wrap d-flex flex-row align-items-center'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-sm-12 text-center'>
            <span className='display-2 d-block heading'>Oops!</span>
            <div className='lead title'>
              Something went wrong... we couldn't find what you were looking
              for.
            </div>
            <div className='mb-4 title'>You can go back to the Homepage</div>
            <div className='col'>
              <img
                src='https://res.cloudinary.com/elijjaaahhhh/image/upload/v1569456145/Group_1_kdsaio.png'
                alt={404}
              />
            </div>
            <div className='button col btn'>
              <Link to='/' className='btn btn-link p-10 text-white'>
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
