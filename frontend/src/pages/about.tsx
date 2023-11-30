import React from 'react';
import { Fade } from 'react-awesome-reveal';
import horseImg from '@/assets/images/horses.png';
import PageLoader from '@/components/Loaders/PageLoader';
import EmployeeItem from '@/components/EmployeeItem/EmployeeItem';
import img from '@/assets/images/kg.jpeg';
import GuideSlider from '@/components/GuideSlider/GuideSlider';

const About = () => {
  return (
    <div className="about-page">
      <PageLoader />
      <div className="about-page-top">
        <img
          alt="mountains"
          src="https://livedemo00.template-help.com/wt_prod-19282/images/bg-image-1.jpg"
          className="about-page-img"
        />
        <div className="about-page-top-info">
          <div className="about-page-top-line"></div>
          <h2 className="about-page-top-title">About</h2>
          <div className="about-page-top-txt">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in
            reprehenderit.
          </div>
        </div>
      </div>
      <div className="about-page-tour">
        <Fade>
          <div className="about-page-tours container">
            <div className="about-page-tours-left">
              <h3 className="about-page-tours-title">
                Fastest Way to Book over 450 Great Tours
              </h3>
              <div className="about-page-tours-txt">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </div>
              <button className="about-page-tours-btn">Book now</button>
            </div>
            <div className="about-page-tours-img-wrap">
              <img
                src={horseImg.src}
                alt="coconout"
                className="about-page-tours-img"
              />
            </div>
          </div>
        </Fade>
      </div>
      <div className="container">
        <Fade>
          <div className="about-page-advantages">
            <div className="about-page-advantages-card card-one">
              <h4 className="about-page-advantages-title">
                <span>01.</span>
                Save Money
              </h4>
              <p className="about-page-advantages-txt">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="about-page-advantages-card card-two">
              <h4 className="about-page-advantages-title">
                <span>02.</span>
                Get Support
              </h4>
              <p className="about-page-advantages-txt">
                Lura, capio, et diatria. Mori recte ducunt ad alter plasmator.
                Experimentum sapienter ducunt ad audax.
              </p>
            </div>
            <div className="about-page-advantages-card card-three">
              <h4 className="about-page-advantages-title">
                <span>03.</span>
                Travel Safety
              </h4>
              <p className="about-page-advantages-txt">
                Indexs ortum! Classiss sunt solitudos de altus adgium. Castus,
                regius triticums superbe anhelare.
              </p>
            </div>
            <div className="about-page-advantages-card card-four">
              <h4 className="about-page-advantages-title">
                <span>04.</span>
                Book Easily
              </h4>
              <p className="about-page-advantages-txt">
                Cur nixus mori? Pol. Sunt hippotoxotaes convertam festus, brevis
                buboes. Brevis terror nunquam amors.
              </p>
            </div>
          </div>
        </Fade>
      </div>
      <div className="about-page-clients">
        <div className="container">
          <Fade>
            <div className="about-page-clients-main">
              <h2 className="about-page-clients-title">
                What Clients Say About Us
              </h2>
              <div>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
              </div>
            </div>
            <div className="about-page-clients-cards">
              <div className="about-page-clients-card">
                <div className="about-page-clients-card-top">
                  <img
                    className="about-page-clients-card-img"
                    src="https://livedemo00.template-help.com/wt_prod-19282/images/testimonials-1-84x84.jpg"
                    alt="review-photo"
                  />
                  <h5 className="about-page-clients-card-title">Jane Smith</h5>
                </div>
                <div className="about-page-clients-card-txt">
                  I wanted to thank you very much for planning the trip to
                  France for my sister and me. It was amazing!
                </div>
                <div className="about-page-clients-card-date">Mar 21, 2021</div>
              </div>
              <div className="about-page-clients-card">
                <div className="about-page-clients-card-top">
                  <img
                    className="about-page-clients-card-img"
                    src="https://livedemo00.template-help.com/wt_prod-19282/images/testimonials-2-84x84.jpg"
                    alt="review-photo"
                  />
                  <h5 className="about-page-clients-card-title">
                    Peter McMillan
                  </h5>
                </div>
                <div className="about-page-clients-card-txt">
                  We had a marvelous time in our travels to Madagascar and
                  Zimbabwe, we had just wonderful experiences.
                </div>
                <div className="about-page-clients-card-date">Mar 21, 2021</div>
              </div>
              <div className="about-page-clients-card">
                <div className="about-page-clients-card-top">
                  <img
                    className="about-page-clients-card-img"
                    src="https://livedemo00.template-help.com/wt_prod-19282/images/testimonials-3-84x84.jpg"
                    alt="review-photo"
                  />
                  <h5 className="about-page-clients-card-title">
                    Samantha Lee
                  </h5>
                </div>
                <div className="about-page-clients-card-txt">
                  The trip you put together for us in Italy went splendid. Each
                  touch point, each adventure, felt like you planned it.
                </div>
                <div className="about-page-clients-card-date">Mar 21, 2021</div>
              </div>
              <div className="about-page-clients-card">
                <div className="about-page-clients-card-top">
                  <img
                    className="about-page-clients-card-img"
                    src="https://livedemo00.template-help.com/wt_prod-19282/images/testimonials-4-84x84.jpg"
                    alt="review-photo"
                  />
                  <h5 className="about-page-clients-card-title">Kate Wilson</h5>
                </div>
                <div className="about-page-clients-card-txt">
                  This is probably the most incredible travel agency I think I
                  have ever used. Thank you for a great tour!
                </div>
                <div className="about-page-clients-card-date">Mar 21, 2021</div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
      <div className="container">
        <Fade>
          <EmployeeItem />
        </Fade>
      </div>
      <div className="about-page-partners">
        <div className="container">
          <Fade>
            <div className="about-page-partners-cards">
              <div className="about-page-partners-card">Partner 1</div>
              <div className="about-page-partners-card">Partner 2</div>
              <div className="about-page-partners-card">Partner 3</div>
              <div className="about-page-partners-card">Partner 4</div>
              <div className="about-page-partners-card">Partner 5</div>
            </div>
          </Fade>
          <div style={{ position: 'relative' }}>
            <GuideSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
