import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { fetchTours } from '@/containers/tours/toursThunk';
import {
  fetchAdminGuides,
  fetchGuideNameByFilter,
} from '@/containers/guides/guidesThunk';

const GuideFilter = () => {
  const [currentTab, setCurrentTab] = useState<'name' | null>(null);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setCurrentTab(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCurrentTab('name');
    setSearchTerm(event.target.value);
    if (event.target.value.length) {
      await dispatch(fetchGuideNameByFilter(event.target.value));
      return;
    } else {
      await dispatch(fetchAdminGuides());
    }
    await dispatch(fetchTours());
  };

  return (
    <section className="section-filter" ref={filterRef}>
      <ul className="filters-list">
        <li
          className="tab-filter"
          onClick={() => {
            setCurrentTab('name');
          }}
        >
          <button
            className={`${
              currentTab === 'name'
                ? 'filter-input filter-active'
                : 'filter-link'
            }`}
            onClick={() => {
              setCurrentTab('name');
            }}
            style={searchTerm ? { textTransform: 'none' } : {}}
          >
            <span className="icon-filter mdi mdi-border-color"></span>
            {currentTab === 'name' ? (
              <input
                type="text"
                placeholder="name"
                className={`filter-link input-filter-name ${
                  currentTab === 'name' ? 'filter-active' : ''
                }`}
                value={searchTerm}
                onChange={handleInputChange}
                onClick={() => {
                  setCurrentTab('name');
                }}
              />
            ) : searchTerm ? (
              searchTerm
            ) : (
              'name'
            )}
          </button>
        </li>
      </ul>
    </section>
  );
};

export default GuideFilter;
