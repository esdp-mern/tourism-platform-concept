import React, { useEffect, useMemo, useRef, useState } from 'react';

interface ICountry {
  country: string;
  toursAmount: number;
}

const MainSlider = () => {
  const mainSliderRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState<ICountry | null>(null);
  const [currentDot, setCurrentDot] = useState<ICountry | null>(null);
  const [sliderChanging, setSliderChanging] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(0);
  const sliderPages = useMemo(
    () => [
      {
        country: 'Kyrgyzstan',
        toursAmount: 13,
      },
      {
        country: 'Kazakhstan',
        toursAmount: 20,
      },
      {
        country: 'Uzbekistan',
        toursAmount: 32,
      },
    ],
    [],
  );

  useEffect(() => {
    setCurrentWidth(window.innerWidth);
    window.addEventListener('resize', () => setCurrentWidth(window.innerWidth));
    setCurrentSlide(sliderPages[0]);
    setCurrentDot(sliderPages[0]);
  }, [sliderPages]);

  const scrollToBottom = () => {
    if (mainSliderRef.current) {
      window.scrollTo({
        top: mainSliderRef.current.scrollHeight * 1.3,
        behavior: 'smooth',
      });
    }
  };

  const onCountryClick = (country: ICountry) => {
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

  const countriesSlider = () => {
    return (
      <div
        className={`countries-slider ${currentSlide?.country.toLowerCase()}`}
      >
        <div
          className="country-slider"
          style={{
            backgroundColor: sliderChanging ? '#ffffff' : 'transparent',
          }}
        >
          <a href="#" className="sliderTitle">
            {currentSlide?.country}
          </a>
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
