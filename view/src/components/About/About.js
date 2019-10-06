import React from 'react';
import './About.css';
const About = () => {
  const showSlides = n => {
    if (
      document.readyState === 'complete' ||
      document.readyState === 'interactive'
    ) {
      var slideIndex = 0;
      var slides = document.getElementsByClassName('mySlides');
      var dots = document.getElementsByClassName('dot');
      if (n <= slides.length) {
        slideIndex = n - 1;
      }
      if (n < 1) {
        slideIndex = 0;
      }
      if (n > slides.length) {
        slideIndex = slides.Length - 1;
      }
      for (let i = 0; i < slides.length; i++) {
        if (i === slideIndex) {

          dots[i].className += ' active';
          slides[i].style.display = 'block';
        } else {
          slides[i].style.display = 'none';
          dots[i].className = dots[i].className.replace(' active', '');
          slides[i].className = slides[i].className.replace(' fade', '');
        }
      }
   
    } else {
    }
  };
  return (
    <div style={{ marginTop: '8rem' }}>
      <div className='mt-5'>
        <header className='center mb-2'>
          <h1 style={{ margin: '0 auto' }}>
            TriptoTracker helps hundreds of thousands people <br />
            worldwide to keep track of their spending.
          </h1>
        </header>
      </div>
      <div style={{ textAlign: 'center' }}>
        <span
          className='dot active'
          onClick={() => {
            showSlides(1);
          }}
        />
        <span
          className='dot'
          onClick={() => {
            showSlides(2);
          }}
        />
      </div>
      <div className='slideshow-container'>
        <div className='mySlides' style={{ display: 'block' }}>
          <div className='testimonial mb-2'>
            <div className='testimonial__info vision'>
              <h1 className='testimonial__name'>Our vision</h1>
              <p className='testimonial__text'>
                To be the world's most used finance tracker application.
              </p>
            </div>
            <div className='testimonial__image-container'>
              <center>
                <img
                  alt='imgg'
                  src='https://res.cloudinary.com/dekillerj/image/upload/v1570289572/Group_3.png'
                  className='testimonial__icon'
                />
              </center>
            </div>
          </div>
          <div className='testimonial mb-2'>
            <div className='testimonial__image-container'>
              <center>
                <img
                  alt='imgg'
                  src='https://res.cloudinary.com/dekillerj/image/upload/v1570289572/Group2.png'
                  className='testimonial__icon'
                />
              </center>
            </div>
            <div className='testimonial__info right'>
              <h1 className='testimonial__name'>Our Mission</h1>
              <p className='testimonial__text mission'>
                Encouraging better spending habits and proper money management
              </p>
            </div>
          </div>
        </div>
        <div className='mySlides' style={{ display: 'none' }}>
          <header className='center mb-2 team'>
            <h1 style={{ margin: '0 auto', marginTop: '3rem' }}>
              Meet the Team
            </h1>
          </header>
          <div className='team-members'>
            <div className='card'>
              <div id='image-container'>
                <img
                  src='https://res.cloudinary.com/dekillerj/image/upload/v1570289675/bee.jpg'
                  alt='Codedcoder'
                  className='image'
                />
                <h2>Codedcoder</h2>
                <span>Team Lead</span>
              </div>
            </div>
            <div className='card'>
              <div id='image-container'>
                <img
                  src='https://res.cloudinary.com/dekillerj/image/upload/v1570289573/vicky.jpg'
                  width='130px'
                  height='130px'
                  style={{ borderRadius: '50%' }}
                  alt='Vicky'
                />
                <h2>Vicky</h2>
                <span>Team Member</span>
              </div>
            </div>
            <div className='card'>
              <div id='image-container'>
                <img
                  src='https://res.cloudinary.com/dekillerj/image/upload/v1554308635/IMG_20170413_194324_332.jpg'
                  alt='Dekiller_j'
                  className='image'
                />
                <h2>Dekiller_j</h2>
                <span>Team Member</span>
              </div>
            </div>
          </div>
          <div className='team-members'>
            <div className='card'>
              <div id='image-container'>
                <img
                  src='https://res.cloudinary.com/abisalde/image/upload/v1554328980/abisalde.png'
                  alt='Abisalde'
                  width='130px'
                  height='130px'
                  style={{ borderRadius: '50%' }}
                />
                <h2>Abisalde</h2>
                <span>Team Member</span>
              </div>
            </div>
            <div className='card'>
              <div id='image-container'>
                <img
                  src='https://res.cloudinary.com/elijjaaahhhh/image/upload/v1570302490/profile_pic_zr9svh.jpg'
                  width='130px'
                  height='130px'
                  style={{ borderRadius: '50%' }}
                  alt='Elijah'
                  className='image'
                />
                <h2>Elijah-dev</h2>
                <span>Team Member</span>
              </div>
            </div>
            <div className='card'>
              <div id='image-container'>
                <img
                  src='https://res.cloudinary.com/shollythegreat/image/upload/v1566912736/HNG%20-%20Task%202/Sholly.jpg'
                  alt='Sholly'
                  width='130px'
                  height='130px'
                  style={{ borderRadius: '50%' }}
                  className='image'
                />
                <h2>Sholly</h2>
                <span>Team Member</span>
              </div>
            </div>
          </div>
          <div className='team-members'>
            <div className='card'>
              <div id='image-container'>
                <img
                  src='https://res.cloudinary.com/spyda-inc/image/upload/v1550315198/rkajsplpsmuf5lvgjghc.jpg'
                  alt='Winnieg'
                  width='auto'
                  height='auto'
                  style={{ borderRadius: '50%' }}
                  className='image'
                />
                <h2>Winnieg</h2>
                <span>Team Member</span>
              </div>
            </div>
            <div className='card'>
              <div id='image-container'>
                <img
                  src='https://res.cloudinary.com/ellarious/image/upload/v1570207704/IMG-20190922-WA0018_louyxm.jpg'
                  alt='Aimes'
                  width='130px'
                  height='130px'
                  style={{ borderRadius: '50%' }}
                  className='image'
                />
                <h2>Aimes_js</h2>
                <span>Team Member</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
