import React from 'react'
import './Faqs.css'
const Faqs = () => {
  return (
    <div>
      <section className='container'>
        <h1>frequently asked questions</h1>
        <div className='faqs'>
          <div className='questions'>
            <h2>
              What is TriptoTracker?
              <span
                data-toggle='collapse'
                href='#collapseAnswer1'
                aria-expanded='false'
                aria-controls='collapseExample'>
                <i className='fa fa-plus fa-xs' id='font-icon' />
              </span>
            </h2>
            <p className='collapse' id='collapseAnswer1'>
              Triptotracker is a financial tracker app that helps you keep
              track of all your expenses and also lets you set up a budget for
              a period of time.
            </p>
          </div>
          <div className='questions'>
            <h2>
              How does it work?
              <span
                data-toggle='collapse'
                href='#collapseAnswer2'
                aria-expanded='false'
                aria-controls='collapseExample'>
                <i className='fa fa-plus fa-xs' id='font-icon' />
              </span>
            </h2>
            <p className='collapse' id='collapseAnswer2'>
              Triptotracker works by summing up the all your financial
              expenses for the time frame you want to view which could either
              be for the week, for the month, or for the year.
            </p>
          </div>
          <div className='questions'>
            <h2>
              Do I need to be tech savvy?
              <span
                data-toggle='collapse'
                href='#collapseAnswer3'
                aria-expanded='false'
                aria-controls='collapseExample'>
                <i className='fa fa-plus fa-xs' id='font-icon' />
              </span>
            </h2>
            <p className='collapse' id='collapseAnswer3'>
              No, you don't need to be tech savvy to use TriptoTracker.
            </p>
          </div>
          <div className='questions'>
            <h2>
              Do I request for my own features?
              <span
                data-toggle='collapse'
                href='#collapseAnswer4'
                aria-expanded='false'
                aria-controls='collapseExample'>
                <i className='fa fa-plus fa-xs' id='font-icon' />
              </span>
            </h2>
            <p className='collapse' id='collapseAnswer4'>
              The features in TriptoTracker are built in already and designed
              to give optimum result. You don't need to request for your own
              features.
            </p>
          </div>
          <div className='questions'>
            <h2>
              What credit card can be used?
              <span
                data-toggle='collapse'
                href='#collapseAnswer5'
                aria-expanded='false'
                aria-controls='collapseExample'>
                <i className='fa fa-plus fa-xs' id='font-icon' />
              </span>
            </h2>
            <p className='collapse' id='collapseAnswer5'>
              Your normal banking credit card can be used.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Faqs
