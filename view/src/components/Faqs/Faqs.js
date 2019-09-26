import React from 'react';
import './Faqs.css';
const Faqs = () => {
  return (
    <div>
      <section id='info' className='py-1'>
        <div className='container'>
          <h2 className='text-center' id='questions'>
            Frequently Asked Questions
          </h2>
          <div id='accordion'>
            <div className='card'>
              <div className='card-header'>
                <h5 className='panel-title'>
                  <a
                    href='#collapse1'
                    data-parent='#accordion'
                    data-toggle='collapse'>
                    What is TriptoTracker?
                  </a>
                </h5>
              </div>
              <div id='collapse1' className='collapse show'>
                <div className='card-body'>
                  TriptoTracker is a financial tracker app that helps you keep
                  track of all your expenses and also lets you set up a budget
                  for a period of time.
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header'>
                <h5 className='panel-title'>
                  <a
                    href='#collapse2'
                    data-parent='#accordion'
                    data-toggle='collapse'>
                    How does it work?
                  </a>
                </h5>
              </div>
              <div id='collapse2' className='collapse'>
                <div className='card-body'>
                  Triptotracker works by summing up the all your financial
                  expenses for the time frame you want to view which could
                  either be for the week, for the month, or for the year.
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header'>
                <h5 className='panel-title'>
                  <a
                    href='#collapse3'
                    data-parent='#accordion'
                    data-toggle='collapse'>
                    Do i need to be tech savvy?
                  </a>
                </h5>
              </div>
              <div id='collapse3' className='collapse'>
                <div className='card-body'>
                  No, you don't need to be tech savvy to use TriptoTracker.
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header'>
                <h5 className='panel-title'>
                  <a
                    href='#collapse4'
                    data-parent='#accordion'
                    data-toggle='collapse'>
                    Do i request for my own features?
                  </a>
                </h5>
              </div>
              <div id='collapse4' className='collapse'>
                <div className='card-body'>
                  The features in TriptoTracker are built in already and
                  designed to give optimum result. You don't need to request for
                  your own features.
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header'>
                <h5 className='panel-title'>
                  <a
                    href='#collapse5'
                    data-parent='#accordion'
                    data-toggle='collapse'>
                    What credit card can be
                  </a>
                </h5>
              </div>
              <div id='collapse5' className='collapse'>
                <div className='card-body'>
                  Your normal banking credit card can be used.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faqs;
