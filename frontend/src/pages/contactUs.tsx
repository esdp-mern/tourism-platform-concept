import React from 'react';
import PageLoader from '@/components/Loaders/PageLoader';

const ContactUs = () => {
  return (
    <div className="contacts-page">
      <PageLoader />
      <div className="contacts-top">
        <img
          src="https://livedemo00.template-help.com/wt_prod-19282/images/bg-image-4.jpg"
          alt="nature"
          className="contacts-main-img"
        />
        <div className="contacts-top-info">
          <div className="contacts-top-line"></div>
          <p className="contacts-top-title">Contact Us</p>
          <p className="contacts-top-txt">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in
            reprehenderit.
          </p>
        </div>
      </div>
      <div className="contacts-page-location">
        <div className="container">
          <div className="contacts-card-main">
            <div className="contacts-card">
              <span className="contacts-country">United States</span>
              <span className="contacts-location">
                9 Valley St. Brooklyn, NY 11203
              </span>
              <span className="contacts-phone">1-800-346-6277</span>
            </div>
            <div className="contacts-card">
              <span className="contacts-country">Canada</span>
              <span className="contacts-location">
                500 Kingston Rd Toronto ON M4L 1V3
              </span>
              <span className="contacts-phone">1-800-346-6277</span>
            </div>
            <div className="contacts-card">
              <span className="contacts-country">Australia</span>
              <span className="contacts-location">
                60 Marcus Clarke St, Canberra, ACT 2601
              </span>
              <span className="contacts-phone">1-800-346-6277</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <form className="contact-form">
          <h3 className="contact-form-title">Get in Touch</h3>
          <div className="contacts-first-inputs">
            <div className="contact-form-textarea">
              <textarea
                className="contact-form-input-name"
                placeholder="Name"
                required
              />
            </div>
            <div className="contact-form-textarea">
              <textarea
                className="contact-form-input-phone"
                placeholder="Phone"
                required
              />
            </div>
            <div className="contact-form-textarea">
              <textarea
                className="contact-form-input-email"
                placeholder="Email"
                required
              />
            </div>
          </div>

          <div className="contact-form-textarea">
            <textarea
              className="contact-form-input-message"
              placeholder="Message"
              required
            />
          </div>
          <button type="submit">send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
