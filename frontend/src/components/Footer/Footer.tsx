import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/containers/users/usersSlice';

const Footer = () => {
  const user = useAppSelector(selectUser);
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
                <Link
                  href={user ? '/guides/becomeGuide' : '/login'}
                  className="footer-inner-top-link"
                >
                  Become a guide!
                </Link>
              </div>
              <div>
                <Link href="/contactUs" className="footer-inner-top-link">
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
                  <Link href="/tours/all/1" className="footer-list-link">
                    Tours
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
            © 2023 Tourism Concept. All rights reserved.
            <span>ㅤPrivacy Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
