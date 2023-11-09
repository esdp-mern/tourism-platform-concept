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
        <span className="link-group-phone" />
        <span className="link-group-email" />
        <span className="link-group-lang" />
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
