import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { fetchTours } from '@/containers/tours/toursThunk';
import { fetchGuideNameByFilter } from '@/containers/guides/guidesThunk';

const GuideFilter = () => {
  const [currentTab, setCurrentTab] = useState<'name' | null>(null);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const filterRef = useRef<HTMLDivElement | null>(null);
  const [showInput, setShowInput] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowInput(false);
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
    }
    await dispatch(fetchTours());
  };

  return (
    <section className="section-filter" ref={filterRef}>
      <ul className="filters-list">
        <li className="tab-filter" onClick={() => setShowInput(true)}>
          <button
            className={`${showInput ? 'filter-input' : 'filter-link'} ${
              currentTab === 'name' ? 'filter-active' : ''
            }`}
            onClick={() => setCurrentTab('name')}
          >
            <span className="icon-filter mdi mdi-border-color"></span>
            {showInput ? (
              <input
                type="text"
                placeholder="name"
                className={`filter-link input-filter-name ${
                  currentTab === 'name' ? 'filter-active' : ''
                }`}
                value={searchTerm}
                onChange={handleInputChange}
              />
            ) : (
              <span style={searchTerm ? { textTransform: 'none' } : {}}>
                {searchTerm ? searchTerm : 'name'}
              </span>
            )}
          </button>
        </li>
      </ul>
    </section>
  );
};

export default GuideFilter;
