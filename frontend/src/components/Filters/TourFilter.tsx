import React, { useEffect, useRef, useState } from 'react';

interface Props {
  fetching: (type: string, value?: string) => void;
  fetchingByPrice: (type: string) => void;
}

const categoriesData = [
  { id: 'checkbox-1', label: 'history' },
  { id: 'checkbox-2', label: 'budget' },
  { id: 'checkbox-3', label: 'popular' },
  { id: 'checkbox-4', label: 'vacation' },
  { id: 'checkbox-5', label: 'exotic' },
];

const TourFilter: React.FC<Props> = ({ fetching, fetchingByPrice }) => {
  const [currentTab, setCurrentTab] = useState<
    'name' | 'categories' | 'min' | 'max' | null
  >(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const toggleCategory = (label: string) => {
    const updatedCategories = selectedCategories.includes(label)
      ? selectedCategories.filter((label) => label !== label)
      : [...selectedCategories, label];

    setSelectedCategories(updatedCategories);
  };

  const prevValuesRef = useRef<{
    name?: string;
    categories?: string;
  }>({
    name: '',
    categories: '',
  });

  useEffect(() => {
    const filters = {
      name: currentTab === 'name' ? searchTerm : undefined,
      categories:
        currentTab === 'categories' ? selectedCategories.join(',') : undefined,
    };

    const hasChanged =
      filters.name !== prevValuesRef.current.name ||
      filters.categories !== prevValuesRef.current.categories;

    if (
      hasChanged &&
      currentTab &&
      (currentTab === 'name' || currentTab === 'categories')
    ) {
      fetching(currentTab, filters[currentTab]);
    }

    prevValuesRef.current = filters;
  }, [currentTab, searchTerm, selectedCategories, fetching]);

  const filterByPrice = (type: 'max' | 'min') => {
    setShowCategories(false);
    setShowInput(false);
    setCurrentTab(type);
    if (currentTab && (currentTab === 'min' || currentTab === 'max')) {
      fetchingByPrice(currentTab);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTab('name');
    setSearchTerm(event.target.value);
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
        <li className="tab-filter" onClick={() => filterByPrice('min')}>
          <button
            className={`filter-link ${
              currentTab === 'min' ? 'filter-active' : ''
            }`}
          >
            <span className="icon-filter mdi mdi-arrow-up"> </span>
            <span>Price Low to High</span>
          </button>
        </li>
        <li className="tab-filter" onClick={() => filterByPrice('max')}>
          <button
            className={`filter-link ${
              currentTab === 'max' ? 'filter-active' : ''
            }`}
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
            <div className="categories-filter">
              <div className="categories-filter-inner">
                <div className="form-wrap mt-md-30">
                  <ul className="list-sm">
                    {categoriesData.map((category) => (
                      <li key={category.id}>
                        <label className="checkbox-inline">
                          <input
                            name={category.label}
                            value={category.label}
                            type="checkbox"
                            className="checkbox-custom"
                            checked={selectedCategories.includes(
                              category.label,
                            )}
                            onChange={() => toggleCategory(category.label)}
                          />
                          <span className="checkbox-custom-dummy"></span>
                          {category.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </li>
      </ul>
    </section>
  );
};

export default TourFilter;
