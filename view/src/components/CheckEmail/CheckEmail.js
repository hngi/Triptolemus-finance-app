import React from 'react';
import { Redirect } from 'react-router-dom';
class CheckEmail extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.location.state !== undefined) {
      this.state = this.props.location.state;
      console.log(this.state);
    }
  }

  render() {
    if (this.state === null || this.state === undefined) {
      return <Redirect to='/' />;
    }
    return (
      <div className='container'>
        <div className='row mt-5 check-email-move'>
          <div className='col-sm-12 align-self-center'>
            <h1>Check your mailbox</h1>
          </div>
        </div>
        <div className='row mt-5 check-email-move'>
          <div className='col-sm-12 align-self-center'>
            <img
              src='https://res.cloudinary.com/taofeeq/image/upload/v1569601500/TriptoTracker/Group_2_ncga9m.png'
              alt='check mailbox'
              style={{ margin: '0px auto' }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CheckEmail;
