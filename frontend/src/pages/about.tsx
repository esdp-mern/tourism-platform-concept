import React, { useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import horseImg from '@/assets/images/horses.png';
import PageLoader from '@/components/Loaders/PageLoader';
import EmployeeItem from '@/components/EmployeeItem/EmployeeItem';
import GuideSlider from '@/components/GuideSlider/GuideSlider';
import PartnerItem from '@/components/PartnerItem/PartnerItem';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsLightMode } from '@/containers/config/configSlice';
import { fetchAboutUs } from '@/containers/about/aboutThunk';
import waveIcon from '@/assets/images/wave-icon.svg';

const About = () => {
  const dispatch = useAppDispatch();
  const { about } = useAppSelector((state) => state.about);

  useEffect(() => {
    dispatch(fetchAboutUs());
    dispatch(setIsLightMode(false));
  }, [dispatch]);

  return (
    <div className="about-page">
      <PageLoader />
      <div className="about-page-top">
        <img
          alt="mountains"
          src={about?.main.image}
          className="about-page-img"
        />
        <div className="about-page-top-info">
          <div className="about-page-top-line">
            <img src={'http://localhost:3000' + waveIcon.src} alt="img" />
          </div>
          <h2 className="about-page-top-title">{about?.main.title}</h2>
          <div className="about-page-top-txt">{about?.main.description}</div>
        </div>
        <button className="about-page-top-edit-btn">Edit</button>
      </div>
      <div className="about-page-tour">
        <Fade>
          <div className="about-page-tours container">
            <div className="about-page-tours-left">
              <h3 className="about-page-tours-title">{about?.offer.title}</h3>
              <div className="about-page-tours-txt">
                {about?.offer.description}
              </div>
              <button className="about-page-tours-btn">Book now</button>
            </div>
            <div className="about-page-tours-img-wrap">
              <img
                src={about?.offer.image}
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
            {about?.posts.map((post, index) => (
              <div key={post._id} className="about-page-advantages-card">
                <img
                  src={post.image}
                  className="about-page-advantages-image"
                  alt="post-img"
                />
                <h4 className="about-page-advantages-title">
                  <span>0{index + 1}.</span>
                  {post.title}
                </h4>
                <p className="about-page-advantages-txt">{post.description}</p>
              </div>
            ))}
          </div>
        </Fade>
      </div>
      <div className="about-page-clients">
        <div className="container">
          <Fade>
            <div className="about-page-clients-main">
              <h2 className="about-page-clients-title">
                {about?.review.title}
              </h2>
              <div>{about?.review.description}</div>
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
      <div className="about-page-guide">
        <div className="about-page-guide-wrap container">
          <Fade>
            <div className="about-page-guide-text-wrap">
              <h3 className="about-page-team-title">Meat our guides</h3>
              <p className="about-page-team-txt">
                Duis aute irure dolor in reprehenderit in voluptate velit
              </p>
            </div>
            <div className="about-page-slider-wrap">
              <GuideSlider />
            </div>
          </Fade>
        </div>
      </div>
      <div className="about-page-partners">
        <div className="container">
          <Fade>
            <PartnerItem />
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default About;
