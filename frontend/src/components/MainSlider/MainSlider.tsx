import React, { useEffect, useMemo, useState } from 'react';
import './mainSlider.css';

interface ICountry {
  country: string;
  toursAmount: number;
}

const MainSlider = () => {
  const [currentSlide, setCurrentSlide] = useState<ICountry | null>(null);
  const [currentDot, setCurrentDot] = useState<ICountry | null>(null);
  const [sliderChanging, setSliderChanging] = useState(false);
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
    setCurrentSlide(sliderPages[0]);
    setCurrentDot(sliderPages[0]);
  }, [sliderPages]);

  const onCountryClick = (country: ICountry) => {
    if (currentSlide?.country === country.country) return;
    setSliderChanging(true);
    setCurrentDot(country);
    setTimeout(() => {
      setSliderChanging(false);
      setCurrentSlide(country);
    }, 400);
  };

  return (
    <div className="main-slider">
      <div className="link-group">
        <a href="tel:#" className="link-group-element link-group-phone">
          <span className="link-group-element-desc">Phone</span>
        </a>
        <a href="mailto:#" className="link-group-element link-group-email">
          <span className="link-group-element-desc">Email</span>
        </a>
        <a href="#" className="link-group-element link-group-lang">
          <span>En</span>
          <span className="link-group-element-desc">English</span>
        </a>
      </div>
      <div
        className={`countries-slider ${currentSlide?.country.toLowerCase()}`}
      >
        <div
          className="country-slider"
          style={{
            backgroundColor: sliderChanging ? '#fafafa' : 'transparent',
          }}
        ></div>
      </div>
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
            {sliderPage.country}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MainSlider;
