import React, { useEffect, useRef, useState } from 'react';
import NavLink from 'next/link';
import UserMenu from './components/UserMenu';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectLanguage,
  selectUser,
  setLang,
} from '@/containers/users/usersSlice';
import ToolBarMenu from '@/components/UI/AppToolBar/components/ToolBarMenu';
import { useParams, usePathname } from 'next/navigation';
import { fetchTour, fetchTours } from '@/containers/tours/toursThunk';
import { apiUrl, languages } from '@/constants';

const AppToolBar = () => {
  const params = useParams() as { id: string; editID: string };
  const user = useAppSelector(selectUser);
  const lang = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();
  const [navShow, setNavShow] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const [langOptions, setLangOptions] = useState(false);
  const pathname = usePathname();

  const { isLightMode } = useAppSelector((state) => state.config);

  const toolBarRef = useRef<HTMLDivElement | null>(null);

  const showMenu = async () => {
    setMenuShow(false);
    await dispatch(fetchTours({}));
  };

  const closeNavMenu = () => setNavShow(false);

  const setClassList = () => {
    if (!toolBarRef.current || isLightMode === null) return;

    const classList: string[] = [
      `tool-bar-body-${isLightMode ? '' : 'dark-'}scrolled`,
    ];

    if (window.scrollY > 0) {
      toolBarRef.current?.classList.add(...classList);
    } else {
      toolBarRef.current?.classList.remove(...classList);
    }
  };

  const setEventListener = () => {
    if (window.screen.width >= 992) {
      document.addEventListener('scroll', setClassList);
    }
  };

  useEffect(() => {
    setEventListener();
    window.addEventListener('resize', setEventListener);

    document.addEventListener('click', () => {
      setNavShow(false);
      setMenuShow(false);
      setLangOptions(false);
    });

    return () => {
      window.removeEventListener('resize', setEventListener);
      document.removeEventListener('scroll', setClassList);
    };
  }, [isLightMode, setClassList, setEventListener]);

  const onLangSwitch = (language: string) => {
    if (
      pathname.includes('tours') &&
      !pathname.includes('tours/all') &&
      pathname !== '/' &&
      !pathname.includes('admin/tours') &&
      !pathname.includes('tours/edit')
    ) {
      dispatch(fetchTour(params.id));
    } else if (pathname.includes('tours/edit')) {
      dispatch(fetchTour(params.editID));
    } else if (
      pathname === '/' ||
      pathname.includes('tours/all') ||
      pathname.includes('admin/tours')
    ) {
      dispatch(fetchTours({}));
    }
    dispatch(setLang(language));
  };

  return (
    <>
      <div
        className={`tool-bar-body ${
          isLightMode ? 'tool-bar-body-light' : 'tool-bar-body-dark'
        }`}
        ref={toolBarRef}
      >
        {pathname && (pathname.includes('tours') || pathname === '/') && (
          <div
            className={`form-lang ${langOptions ? 'form-lang-open' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setLangOptions(!langOptions);
            }}
          >
            <span className="form-lang-value">
              <img src={apiUrl + `/fixtures/${lang}.jpg`} alt={lang} />
            </span>
            <div
              className={`form-lang-options form-lang-options-${
                langOptions ? 'open' : 'closed'
              }`}
            >
              {Object.keys(languages).map(
                (language) =>
                  language !== lang && (
                    <span
                      className="form-lang-option"
                      onClick={() => onLangSwitch(language)}
                      key={language}
                    >
                      <img
                        src={apiUrl + `/fixtures/${language}.jpg`}
                        alt={language}
                      />
                    </span>
                  ),
              )}
            </div>
          </div>
        )}
        <div className="container">
          <div className="tool-bar">
            <div className="logo-wrap">
              <button
                className={`nav-btn ${!isLightMode ? 'nav-btn-dark' : ''} ${
                  navShow ? 'open' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setNavShow(!navShow);
                  setMenuShow(false);
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              <NavLink href="/" className="logo" onClick={showMenu}>
                Tourism Concept
              </NavLink>
            </div>
            <nav
              className={`nav ${navShow ? 'nav-active' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              <NavLink
                href="/"
                className={`nav-link ${pathname === '/' ? 'active' : ''}`}
                onClick={() => {
                  showMenu();
                  closeNavMenu();
                }}
              >
                Home
              </NavLink>
              <NavLink
                href="/tours/all/1"
                className={`nav-link ${
                  pathname && pathname.includes('/tours/all') ? 'active' : ''
                }`}
                onClick={() => {
                  showMenu();
                  closeNavMenu();
                }}
              >
                Tours
              </NavLink>
              <NavLink
                href="/about"
                className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
                onClick={() => {
                  showMenu();
                  closeNavMenu();
                }}
              >
                About Us
              </NavLink>
              {user ? (
                <UserMenu
                  user={user}
                  onClick={() => {
                    showMenu();
                    closeNavMenu();
                  }}
                  pathname={pathname}
                />
              ) : (
                <div></div>
              )}
              <NavLink
                href="/news/all/1"
                className={`nav-link ${
                  pathname && pathname.includes('/news/all') ? 'active' : ''
                }`}
                onClick={() => {
                  showMenu();
                  closeNavMenu();
                }}
              >
                News
              </NavLink>
              <NavLink
                href="/contactUs"
                className={`nav-link ${
                  pathname === '/contactUs' ? 'active' : ''
                }`}
                onClick={async () => {
                  await showMenu();
                  closeNavMenu();
                }}
              >
                Contact Us
              </NavLink>
            </nav>
            <div className="user-menu">
              <button
                className={`menu-btn ${!isLightMode ? 'menu-btn-dark' : ''} ${
                  menuShow ? 'open' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuShow(!menuShow);
                  dispatch(fetchTours({}));
                }}
              >
                <span></span>
                <span></span>
                <span></span>
                <span>menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToolBarMenu show={menuShow} onClick={showMenu} />
    </>
  );
};

export default AppToolBar;
