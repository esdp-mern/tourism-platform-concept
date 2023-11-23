import React from 'react';
import image404 from '@/assets/images/404.jpg';
import Image from 'next/image';
import PageLoader from '@/components/Loaders/PageLoader';
import Link from 'next/link';
export default function Custom404({
  errorType,
}: {
  errorType?: 'guide' | 'tour';
}) {
  return (
    <div className="page-error">
      <PageLoader />
      <div className="header-error">
        <Image src={image404} className="about-page-img" alt="error404" />
        <div className="error-page-top-info">
          <div className="about-page-top-line"></div>
          <h2 className="about-page-top-title">Page not Found</h2>
          <div className="about-page-top-txt">
            Sorry, we couldn{"'"}t find the page you{"'"}re looking for. Let
            {"'"}s get you back on track. You can go back to the {''}
            <Link href="/" className="about-page-top-txt">
              homepage
            </Link>
            .
          </div>
        </div>
      </div>

      <section className="section-error">
        <div className="container-error">
          <div className="text-group-1">
            <p className="text-xxl">404</p>
            <h4 className="error-title">
              Oops! That {!errorType ? 'page' : errorType} can{"'"}t be found
            </h4>
          </div>
        </div>
      </section>
    </div>
  );
}
