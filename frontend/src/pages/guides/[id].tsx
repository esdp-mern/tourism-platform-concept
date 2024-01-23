import { wrapper } from '@/store/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectOneGuide } from '@/containers/guides/guidesSlice';
import React, { useEffect, useState } from 'react';
import { fetchGuide } from '@/containers/guides/guidesThunk';
import { useParams } from 'next/navigation';
import { setIsLightMode } from '@/containers/config/configSlice';
import { InferGetServerSidePropsType, NextPage } from 'next';
import PageLoader from '@/components/Loaders/PageLoader';
import Custom404 from '@/pages/404';
import GuideInfo from '@/components/OneGuidePage/GuideInfo/GuideInfo';
import GuideReviews from '@/components/OneGuidePage/GuideReviews/GuideReviews';
import { fetchGuideReviews } from '@/containers/reviews/reviewThunk';
import { fetchToursGuide } from '@/containers/tours/toursThunk';
import Image from 'next/image';
import bgImage from '@/assets/images/bg-image-1.jpg';

interface IGuidePageTabs {
  name: string;
  title: string;
}

const GuidePageTabs: IGuidePageTabs[] = [
  { title: 'Information', name: 'information' },
  { title: 'Reviews', name: 'reviews' },
];

const OneGuidePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const dispatch = useAppDispatch();
  const guide = useAppSelector(selectOneGuide);
  const { id } = useParams() as {
    id: string;
  };
  const [currentTab, setCurrentTab] = useState<string>('information');

  useEffect(() => {
    dispatch(setIsLightMode(false));
    dispatch(fetchGuide(id));
    dispatch(fetchToursGuide(id));
    dispatch(fetchGuideReviews(id));
  }, [dispatch, id]);

  if (!guide) return <Custom404 errorType="guide" />;

  const clickTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setCurrentTab(name);
  };

  return (
    <div>
      <PageLoader />
      <div className="guide-page_top">
        <Image
          fill
          className="guide-page_img"
          src={bgImage.src}
          alt="mountains"
        />
        <div className="guide-page_top-info">
          <div className="guide-page_top-line"></div>
          <h2 className="guide-page_top-name">{guide.user.displayName}</h2>
        </div>
      </div>
      <div className="one-guide_slider-button">
        {GuidePageTabs.map(({ title, name }) => (
          <button
            name={name}
            onClick={clickTab}
            className={
              currentTab === name
                ? `one-guide_slider-${name} one-guide_btn-active`
                : `one-guide_slider-${name} one-guide_slider-btns-btn`
            }
            key={name}
          >
            <span>{title}</span>
          </button>
        ))}
      </div>
      <div className="container">
        {currentTab === 'information' && <GuideInfo />}
        {currentTab === 'reviews' && <GuideReviews />}
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const id = params?.id;

      if (!id || Array.isArray(id)) {
        throw new Error('Param id must be a string');
      }

      await store.dispatch(fetchGuide(id));
      return { props: {} };
    },
);

export default OneGuidePage;
