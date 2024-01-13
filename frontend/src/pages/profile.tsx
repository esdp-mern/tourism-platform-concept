import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser, setEditorModal } from '@/containers/users/usersSlice';
import { useRouter } from 'next/router';
import PageLoader from '@/components/Loaders/PageLoader';
import { setIsLightMode } from '@/containers/config/configSlice';
import { fetchGuideUser } from '@/containers/guides/guidesThunk';
import { User } from '@/type';
import img from '../assets/images/userImage.jpeg';
import { fetchOrdersUser } from '@/containers/orders/ordersThunk';
import UserOrders from '@/components/UserOrders/UserOrders';
import GuideProfile from '@/components/GuideProfile/GuideProfile';
import { GetServerSideProps } from 'next';

const Profile = () => {
  const dispatch = useAppDispatch();
  const user: User = useAppSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    dispatch(setIsLightMode(false));
    if (!user) {
      router.push('/').then((r) => r);
    }
  }, [user, router, dispatch]);

  if (!user) return null;

  let image;

  if (user.avatar) {
    image = user.avatar;
  } else {
    image = img.src;
  }

  if (user.role === 'guid') {
    dispatch(fetchGuideUser(user._id));
  }

  if (user.role === 'user') {
    dispatch(fetchOrdersUser(user._id));
  }

  return (
    <div>
      <PageLoader />
      <div className="profile-page_top">
        <img
          alt="mountains"
          src="https://livedemo00.template-help.com/wt_prod-19282/images/bg-image-1.jpg"
          className="profile-page_main-img"
        />
        <div className="profile-page_top-info">
          <div className="profile-page_top-line"></div>
          <h2 className="profile-page_top-title">My profile</h2>
        </div>
      </div>
      <div className="page-profile container">
        <div className="profile-page_profile">
          <div className="profile-page_img-wrap">
            <img className="profile-page_img" src={image} alt="img" />
          </div>
          <div>
            <h4 className="profile-page_name">Name : {user.displayName}</h4>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <button
              className="edit-profile page-profile_edit-btn"
              onClick={() => {
                dispatch(setEditorModal());
              }}
            >
              Edit profile
            </button>
          </div>
        </div>
        <div className="profile-page_info">
          {user.role === 'user' && (
            <div>
              <h4>Your orders :</h4>
              <UserOrders />
            </div>
          )}
          {user.role === 'guid' && (
            <div>
              <GuideProfile />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
