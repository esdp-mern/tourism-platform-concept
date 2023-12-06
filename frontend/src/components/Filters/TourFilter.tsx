import React, { useEffect, useRef, useState } from 'react';

interface Props {
  fetching: (fetching: string) => void;
}

const TourFilter: React.FC<Props> = ({ fetching }) => {
  const [currentTab, setCurrentTab] = useState<string>('default');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<boolean>(false);

  useEffect(() => {
    fetching(currentTab);
  }, [currentTab, fetching]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTab('name');
    setSearchTerm(event.target.value);
  };

  const resetChoosenFilter = () => {
    setShowCategories(false);
    setShowInput(false);
  };

  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowInput(false);
        setShowCategories(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
        <li className="tab-filter" onClick={resetChoosenFilter}>
          <button
            className={`filter-link ${
              currentTab === 'low' ? 'filter-active' : ''
            }`}
            onClick={() => setCurrentTab('low')}
          >
            <span className="icon-filter mdi mdi-arrow-up"> </span>
            <span>Price Low to High</span>
          </button>
        </li>
        <li className="tab-filter" onClick={resetChoosenFilter}>
          <button
            className={`filter-link ${
              currentTab === 'high' ? 'filter-active' : ''
            }`}
            onClick={() => setCurrentTab('high')}
          >
            <span className="icon-filter mdi mdi-arrow-down"></span>
            <span>Price High to Low</span>
          </button>
        </li>
        <li className="tab-filter tab-category">
          <button
            className={`filter-link ${
              currentTab === 'categories' ? 'filter-active' : ''
            }`}
            onClick={() => {
              setCurrentTab('categories');
              setShowCategories(!showCategories);
            }}
          >
            <span className="icon-filter mdi mdi-information-outline"></span>
            <span>Categories</span>
          </button>

          {showCategories ? (
            <div className="categories-filter">fdsfsdfs</div>
          ) : null}
        </li>
      </ul>
    </section>
  );
};

export default TourFilter;
