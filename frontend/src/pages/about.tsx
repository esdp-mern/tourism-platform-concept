import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import PageLoader from '@/components/Loaders/PageLoader';
import EmployeeItem from '@/components/EmployeeItem/EmployeeItem';
import GuideSlider from '@/components/GuideSlider/GuideSlider';
import PartnerItem from '@/components/PartnerItem/PartnerItem';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsLightMode } from '@/containers/config/configSlice';
import { editAboutUsBlock, fetchAboutUs } from '@/containers/about/aboutThunk';
import waveIcon from '@/assets/images/wave-icon.svg';
import penIcon from '@/assets/images/pen-icon.svg';
import { IAboutUs, IAboutUsBlock } from '@/type';
import { IChangeEvent } from '@/components/OneTourOrderForm/OneTourOrderForm';
import { userRoles } from '@/constants';
import Link from "next/link";

const About = () => {
  const dispatch = useAppDispatch();
  const { about, editAboutUsBlockLoading } = useAppSelector(
    (state) => state.about,
  );
  const { user } = useAppSelector((state) => state.users);
  const [sectionName, setSectionName] = useState<string>('');
  const [editBlock, setEditBlock] = useState<IAboutUsBlock | null>(null);

  useEffect(() => {
    dispatch(fetchAboutUs());
    dispatch(setIsLightMode(false));
  }, [dispatch]);

  const changeValue = (e: IChangeEvent) => {
    const { name, value } = e.target;

    setEditBlock((prevState) => prevState && { ...prevState, [name]: value });
  };

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !editBlock ||
      editBlock.title.length < 1 ||
      (editBlock.description !== undefined && editBlock.description.length < 1)
    )
      return;

    try {
      await dispatch(
        editAboutUsBlock({ sectionName, section: editBlock }),
      ).unwrap();
      setSectionName('');
      setEditBlock(null);
    } catch {
      // nothing
    }
  };

  const modal = editBlock && (
    <form className="about-page-edit-modal" onSubmit={sendData}>
      <div className="about-page-edit-modal-header">
        <h2>Edit</h2>
        <img src={penIcon.src} alt="pen-icon" />
      </div>

      <div className="about-page-edit-modal-text-fields">
        <input
          required
          placeholder="Title"
          className="about-page-edit-modal-title"
          type="text"
          name="title"
          value={editBlock.title}
          onChange={changeValue}
        />

        {editBlock.description !== undefined && (
          <textarea
            required
            placeholder="Description"
            className="about-page-edit-modal-description"
            name="description"
            value={editBlock.description}
            onChange={changeValue}
            rows={4}
          />
        )}

        <button
          className="about-page-edit-modal-btn"
          disabled={editAboutUsBlockLoading}
        >
          {editAboutUsBlockLoading ? <span className="spinner"></span> : 'Save'}
        </button>
      </div>
      <button
        className="about-page-edit-modal-close-btn"
        onClick={() => setEditBlock(null)}
      >
        <span></span>
        <span></span>
      </button>
    </form>
  );

  const getEditButton = (name: keyof IAboutUs, block: IAboutUsBlock) => {
    const onClick = () => {
      setSectionName(name);
      setEditBlock(block);
    };

    return (
      user &&
      user.role === userRoles.admin && (
        <button className="about-page-edit-btn" name={name} onClick={onClick}>
          <img src={penIcon.src} alt="" />
        </button>
      )
    );
  };

  return (
    about && (
      <div className="about-page">
        <PageLoader />
        {editBlock && (
          <div
            className="about-page-edit-modal-backdrop"
            onClick={() => setEditBlock(null)}
          ></div>
        )}
        {modal}
        <div className="about-page-top">
          <img
            alt="mountains"
            src={about.main.image}
            className="about-page-img"
          />
          <div className="about-page-top-info">
            <div className="about-page-top-line">
              <img src={'http://localhost:3000' + waveIcon.src} alt="img" />
            </div>
            <h2 className="about-page-top-title">
              {about.main.title}
              {getEditButton('main', about.main)}
            </h2>
            <div className="about-page-top-txt">{about.main.description}</div>
          </div>
        </div>
        <div className="about-page-tour">
          <Fade>
            <div className="about-page-tours container">
              <div className="about-page-tours-left">
                <h3 className="about-page-tours-title">
                  {about.offer.title}
                  {getEditButton('offer', about.offer)}
                </h3>
                <div className="about-page-tours-txt">
                  {about.offer.description}
                </div>
                <button className="about-page-tours-btn">Book now</button>
              </div>
              <div className="about-page-tours-img-wrap">
                <img
                  src={about.offer.image}
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
              {about.posts.map((post, index) => (
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
                  <p className="about-page-advantages-txt">
                    {post.description}
                  </p>
                  {getEditButton('posts', post)}
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
                  {about.review.title}
                  {getEditButton('review', about.review)}
                </h2>
                <div>{about.review.description}</div>
              </div>
              <div className="about-page-clients-cards">
                <div className="about-page-clients-card">
                  <div className="about-page-clients-card-top">
                    <img
                      className="about-page-clients-card-img"
                      src="https://livedemo00.template-help.com/wt_prod-19282/images/testimonials-1-84x84.jpg"
                      alt="review-photo"
                    />
                    <h5 className="about-page-clients-card-title">
                      Jane Smith
                    </h5>
                  </div>
                  <div className="about-page-clients-card-txt">
                    I wanted to thank you very much for planning the trip to
                    France for my sister and me. It was amazing!
                  </div>
                  <div className="about-page-clients-card-date">
                    Mar 21, 2021
                  </div>
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
                  <div className="about-page-clients-card-date">
                    Mar 21, 2021
                  </div>
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
                    The trip you put together for us in Italy went splendid.
                    Each touch point, each adventure, felt like you planned it.
                  </div>
                  <div className="about-page-clients-card-date">
                    Mar 21, 2021
                  </div>
                </div>
                <div className="about-page-clients-card">
                  <div className="about-page-clients-card-top">
                    <img
                      className="about-page-clients-card-img"
                      src="https://livedemo00.template-help.com/wt_prod-19282/images/testimonials-4-84x84.jpg"
                      alt="review-photo"
                    />
                    <h5 className="about-page-clients-card-title">
                      Kate Wilson
                    </h5>
                  </div>
                  <div className="about-page-clients-card-txt">
                    This is probably the most incredible travel agency I think I
                    have ever used. Thank you for a great tour!
                  </div>
                  <div className="about-page-clients-card-date">
                    Mar 21, 2021
                  </div>
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
              <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                <Link href={`/partners/becomePartner`} className="become-partner" style={{ marginBottom: '20px' }}>
                  BECOME A PARTNER
                </Link>
                <PartnerItem />
              </div>
            </Fade>
          </div>
        </div>
      </div>
    )
  );
};

export default About;
