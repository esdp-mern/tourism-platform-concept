import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div>
      <div className="footer-inner">
        <div className="footer-inner-top container">
          <div className="footer-inner-top-1">
            <h6 className="footer-title">Quick Links</h6>
            <div className="footer-inner-top-links">
              <div>
                <Link href="/about" className="footer-inner-top-link">
                  About
                </Link>
                <Link href="/reviews" className="footer-inner-top-link">
                  Customer Reviews
                </Link>
                <Link
                  href="/guides/becomeGuide"
                  className="footer-inner-top-link"
                >
                  Become a guide!
                </Link>
              </div>
              <div>
                <Link href="/contacts" className="footer-inner-top-link">
                  Contacts
                </Link>
                <Link href="/news/all/1" className="footer-inner-top-link">
                  Blog
                </Link>
              </div>
            </div>
            <div className="footer-inner-top-social">
              <a className="footer-links facebook" href="#" />
              <a className="footer-links instagram" href="#" />
              <a className="footer-links twitter" href="#" />
              <a className="footer-links whatsapp" href="#" />
            </div>
          </div>
          <div className="footer-inner-top-2">
            <h6 className="footer-title">Get in touch</h6>
            <div className="footer-address">
              9 Valley St. Brooklyn, NY 11203
            </div>
            <div className="footer-phone">1-800-346-6277</div>
            <div className="footer-email">info@demolink.org</div>
          </div>
          <div className="footer-inner-top-3">
            <h6 className="footer-title">For travelers</h6>
            <div>
              <ul className="footer-list-links">
                <li>
                  <Link
                    href="/tours/all/[pageNum]"
                    className="footer-list-link"
                  >
                    Tours
                  </Link>
                </li>
                <li>
                  <Link href="/destinations" className="footer-list-link">
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tours/all/[pageNum]"
                    className="footer-list-link"
                  >
                    Travel Insurance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tours/all/[pageNum]"
                    className="footer-list-link"
                  >
                    Help
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-inner-two">
        <div className="container">
          <div className="footer-inner-two-txt">
            © 2023 Sunway. All rights reserved.
            <span>ㅤPrivacy Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
