import React from 'react';
import './Faqs.css';
const Faqs = () => {
  return (
    <>
    <section id="faqs-info" className="py-5" style={{marginTop:"40px"}}>
                        <div className="container">
                            <h2 className="text-center" id="questions">Frequently Asked Questions</h2>
                            <div id="accordion">
                                    <div className="card">
                                      <div className="card-header">
                                        <h5 className="panel-title">
                                          <a href="#collapse1" data-parent="#accordion" data-toggle="collapse">
                                            What is TriptoTracker?
                                          </a>
                                        </h5>
                                      </div>
                              
                                      <div id="collapse1" className="collapse show">
                                        <div className="card-body">
                                                TriptoTracker is a financial tracker app that helps you keep track of all your expenses and also lets you set up a budget for a period of time.
                                        </div>
                                      </div>
                                    </div>
                              
                                    <div className="card">
                                      <div className="card-header">
                                        <h5 className="panel-title">
                                          <a href="#collapse2" data-parent="#accordion" data-toggle="collapse">
                                            How does it work?
                                          </a>
                                        </h5>
                                      </div>
                              
                                      <div id="collapse2" className="collapse">
                                        <div className="card-body">
                                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis ea iste a doloremque, cumque, debitis eum vel ipsum architecto
                                          aut, recusandae totam ullam aperiam. Nesciunt expedita officiis animi quam corporis optio inventore facilis sint
                                          et nulla in, repellat debitis dolor at nisi quo, unde temporibus. Quos nisi nostrum officia, illo.
                                        </div>
                                      </div>
                                    </div>
                              
                                    <div className="card">
                                      <div className="card-header">
                                        <h5 className="panel-title">
                                          <a href="#collapse3" data-parent="#accordion" data-toggle="collapse">
                                            Do i need to be tech savvy?
                                          </a>
                                        </h5>
                                      </div>
                              
                                      <div id="collapse3" className="collapse">
                                        <div className="card-body">
                                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis ea iste a doloremque, cumque, debitis eum vel ipsum architecto
                                          aut, recusandae totam ullam aperiam. Nesciunt expedita officiis animi quam corporis optio inventore facilis sint
                                          et nulla in, repellat debitis dolor at nisi quo, unde temporibus. Quos nisi nostrum officia, illo.
                                        </div>
                                      </div>
                                    </div>

                                    <div className="card">
                                            <div className="card-header">
                                              <h5 className="panel-title">
                                                <a href="#collapse4" data-parent="#accordion" data-toggle="collapse">
                                                Do i request for my own features?
                                                </a>
                                              </h5>
                                            </div>
                                    
                                            <div id="collapse4" className="collapse">
                                              <div className="card-body">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis ea iste a doloremque, cumque, debitis eum vel ipsum architecto
                                                aut, recusandae totam ullam aperiam. Nesciunt expedita officiis animi quam corporis optio inventore facilis sint
                                                et nulla in, repellat debitis dolor at nisi quo, unde temporibus. Quos nisi nostrum officia, illo.
                                              </div>
                                            </div>
                                    </div>

                                    <div className="card">
                                            <div className="card-header">
                                              <h5 className="panel-title">
                                                <a href="#collapse5" data-parent="#accordion" data-toggle="collapse">
                                                What credit card can be
                                                </a>
                                              </h5>
                                            </div>
                                    
                                            <div id="collapse5" className="collapse">
                                            <div className="card-body">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis ea iste a doloremque, cumque, debitis eum vel ipsum architecto
                                                aut, recusandae totam ullam aperiam. Nesciunt expedita officiis animi quam corporis optio inventore facilis sint
                                                et nulla in, repellat debitis dolor at nisi quo, unde temporibus. Quos nisi nostrum officia, illo.
                                            </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                    </section>
    


      </>

);
};

export default Faqs;
