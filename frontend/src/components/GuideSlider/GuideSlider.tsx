'use client';
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectGuides } from '@/containers/guides/guidesSlice';
import { fetchGuides } from '@/containers/guides/guidesThunk';
import GuideItem from '@/components/GuideItem/GuideItem';
import { apiUrl } from '@/constants';

const GuideSlider = () => {
  const dispatch = useAppDispatch();
  const guides = useAppSelector(selectGuides);

  useEffect(() => {
    dispatch(fetchGuides());
  }, [dispatch]);

  return (
    <>
      <Swiper
        loop={true}
        grabCursor={true}
        spaceBetween={32}
        freeMode={true}
        breakpoints={{
          700: {
            slidesPerView: 'auto',
            spaceBetween: 0,
          },
          908: {
            slidesPerView: 'auto',
            spaceBetween: 0,
          },
        }}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {guides.map((guide, index) => (
          <SwiperSlide key={index}>
            <GuideItem
              id={guide._id}
              name={guide.user.displayName}
              role={guide.user.role}
              description={guide.description}
              imageUrl={apiUrl + '/' + guide.user.avatar}
            />
          </SwiperSlide>
        ))}
        {guides.map((guide, index) => (
          <SwiperSlide key={index + 1}>
            <GuideItem
              id={guide._id}
              name={guide.user.displayName}
              role={guide.user.role}
              description={guide.description}
              imageUrl={apiUrl + '/' + guide.user.avatar}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default GuideSlider;
