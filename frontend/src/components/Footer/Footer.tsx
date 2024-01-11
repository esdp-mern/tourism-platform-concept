import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/containers/users/usersSlice';
import { T } from '@/store/translation';

const Footer = () => {
  const user = useAppSelector(selectUser);
  return (
    <div>
      <div className="footer-inner">
        <div className="footer-inner-top container">
          <div className="footer-inner-top-1">
            <h6 className="footer-title">{T('/footer', 'links')}</h6>
            <div className="footer-inner-top-links">
              <div>
                <Link href="/about" className="footer-inner-top-link">
                  {T('/footer', 'about_us')}
                </Link>
                <Link
                  href={user ? '/guides/becomeGuide' : '/login'}
                  className="footer-inner-top-link"
                >
                  {T('/footer', 'guide')}!
                </Link>
              </div>
              <div>
                <Link href="/contactUs" className="footer-inner-top-link">
                  {T('/footer', 'contact_us')}
                </Link>
                <Link href="/news/all/1" className="footer-inner-top-link">
                  {T('/footer', 'news')}
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
            <h6 className="footer-title">{T('/footer', 'touch')}</h6>
            <div className="footer-address">{T('/footer', 'address')}</div>
            <div className="footer-phone">1-800-346-6277</div>
            <div className="footer-email">info@demolink.org</div>
          </div>
          <div className="footer-inner-top-3">
            <h6 className="footer-title">{T('/footer', 'travellers')}</h6>
            <div>
              <ul className="footer-list-links">
                <li>
                  <Link href="/tours/all/1" className="footer-list-link">
                    {T('/footer', 'tours')}
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
            © 2023 Tourism Concept. {T('/footer', 'privacy_text')}.
            <span>ㅤ{T('/footer', 'privacy')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
