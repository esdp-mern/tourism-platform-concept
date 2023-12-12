import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAllMainSliders } from '@/containers/slider/sliderSlice';
import { deleteSliders, fetchSliders } from '@/containers/slider/sliderThunk';
import { apiUrl, userRoles } from '@/constants';
import { IMainSlider } from '@/type';
import { selectUser } from '@/containers/users/usersSlice';
import { useRouter } from 'next/router';

const MainSlider = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const sliders = useAppSelector(selectAllMainSliders);
  const mainSliderRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState<IMainSlider | null>(null);
  const [currentDot, setCurrentDot] = useState<IMainSlider | null>(null);
  const [sliderChanging, setSliderChanging] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(0);

  const sliderPages = useMemo(() => sliders, [sliders]);
  useEffect(() => {
    dispatch(fetchSliders());
  }, [dispatch]);

  useEffect(() => {
    setCurrentWidth(window.innerWidth);
    window.addEventListener('resize', () => setCurrentWidth(window.innerWidth));
    setCurrentSlide(sliderPages[0]);
    setCurrentDot(sliderPages[0]);
  }, [dispatch, sliderPages]);

  const scrollToBottom = () => {
    if (mainSliderRef.current) {
      window.scrollTo({
        top: mainSliderRef.current.scrollHeight * 1.3,
        behavior: 'smooth',
      });
    }
  };

  const onCountryClick = (country: IMainSlider) => {
    if (currentSlide?.country === country.country) return;
    setSliderChanging(true);
    setCurrentDot(country);
    setTimeout(() => {
      setSliderChanging(false);
      setCurrentSlide(country);
    }, 400);
  };

  const linkGroup = () => {
    return (
      <div className="link-group">
        <a href="tel:#" className="link-group-element link-group-phone">
          <span className="link-group-element-desc">Phone</span>
        </a>
        <a href="mailto:#" className="link-group-element link-group-email">
          <span className="link-group-element-desc">Email</span>
        </a>
        <a href="#" className="link-group-element link-group-lang">
          <span className="link-group-lang-en">En</span>
          <span className="link-group-element-desc">English</span>
        </a>
      </div>
    );
  };

  const link = apiUrl + '/' + currentSlide?.image;

  const onDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this slider?')) {
      if (id) {
        await dispatch(deleteSliders(id));
        dispatch(fetchSliders());
      }
    }
  };
  const countriesSlider = () => {
    return (
      <div
        className={`countries-slider `}
        style={{ backgroundImage: `url(${link})` }}
      >
        <div
          className="country-slider"
          style={{
            backgroundColor: sliderChanging ? '#ffffff' : 'transparent',
          }}
        >
          <div>
            <a href="#" className="sliderTitle">
              {currentSlide?.country}
            </a>
            {user && user.role === userRoles.admin ? (
              <div className="country-slider-btns">
                <button
                  type="button"
                  className="country-slider-btns-delete"
                  onClick={() => onDelete(currentSlide?._id!)}
                >
                  Delete
                </button>
                <button
                  className="country-slider-btns-edit"
                  type="button"
                  onClick={() => {
                    if (currentSlide && currentSlide._id) {
                      router
                        .push(`/slider/edit/${currentSlide._id}`)
                        .then((r) => r);
                    }
                  }}
                >
                  Edit
                </button>
              </div>
            ) : null}
          </div>
          <span className="sliderCaption">
            {currentSlide?.toursAmount} tours
          </span>
          <span className="scrollDown" onClick={scrollToBottom} />
        </div>
      </div>
    );
  };

  const countryDots = () => {
    return (
      <div className="country-dots">
        {sliderPages.map((sliderPage) => (
          <span
            className={`country-dot ${
              currentDot?.country === sliderPage.country
                ? 'country-dot-selected'
                : ''
            }`}
            key={sliderPage.country}
            onClick={() => onCountryClick(sliderPage)}
          >
            {currentWidth > 475 && sliderPage.country}
          </span>
        ))}
        {user && user.role === userRoles.admin ? (
          <button
            className="country-slider-btns-add"
            type="button"
            onClick={() => {
              router.push(`/slider/create`).then((r) => r);
            }}
          >
            Add new slider
          </button>
        ) : null}
      </div>
    );
  };

  return (
    <div className="slider-container">
      <div className="main-slider" ref={mainSliderRef}>
        {currentWidth >= 768 && linkGroup()}
        {countriesSlider()}
        {countryDots()}
        {currentWidth <= 768 && linkGroup()}
      </div>
    </div>
  );
};

export default MainSlider;
