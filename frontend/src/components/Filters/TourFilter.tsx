import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import {
  fetchTours,
  fetchToursByFilter,
  fetchToursByPrice,
} from '@/containers/tours/toursThunk';
import { useParams } from 'next/navigation';

const categoriesData = [
  { id: 'checkbox-1', label: 'history' },
  { id: 'checkbox-2', label: 'budget' },
  { id: 'checkbox-3', label: 'popular' },
  { id: 'checkbox-4', label: 'vacation' },
  { id: 'checkbox-5', label: 'exotic' },
];

const TourFilter = () => {
  const params = useParams() as { pageNum: string };
  const limitTours = 6;
  const [currentTab, setCurrentTab] = useState<
    'name' | 'categories' | 'min' | 'max' | null
  >(null);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (params) {
      setCurrentPage(parseInt(params.pageNum));
    }
  }, [params]);

  const indexOfLastRecord = currentPage * limitTours;
  const indexOfFirstRecord = indexOfLastRecord - limitTours;

  const toggleCategory = async (label: string) => {
    const updatedCategories = selectedCategories.includes(label)
      ? selectedCategories.filter((label) => label !== label)
      : [...selectedCategories, label];

    setSelectedCategories(updatedCategories);
    if (!currentTab || !selectedCategories) return;
    console.log(updatedCategories);
    if (updatedCategories.length) {
      await dispatch(
        fetchToursByFilter({
          type: 'categories',
          value: updatedCategories.join(','),
          skip: indexOfFirstRecord,
          limit: limitTours,
        }),
      );
      return;
    }
    await dispatch(
      fetchTours({
        skip: indexOfFirstRecord,
        limit: limitTours,
      }),
    );
  };

  const filterByPrice = async (type: 'max' | 'min') => {
    setShowCategories(false);
    setCurrentTab(type);
    if (type && (type === 'min' || type === 'max')) {
      await dispatch(
        fetchToursByPrice({
          type,
          skip: indexOfFirstRecord,
          limit: limitTours,
        }),
      );
    }
  };

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCurrentTab('name');
    setSearchTerm(event.target.value);
    if (event.target.value.length) {
      await dispatch(
        fetchToursByFilter({
          type: 'name',
          value: event.target.value,
          skip: indexOfFirstRecord,
          limit: limitTours,
        }),
      );
      return;
    }
    await dispatch(
      fetchTours({
        skip: indexOfFirstRecord,
        limit: limitTours,
      }),
    );
  };

  const filterRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentTab === 'name' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentTab]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setCurrentTab(null);
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
          >
            <span className="icon-filter mdi mdi-border-color"></span>
            {currentTab === 'name' ? (
              <input
                ref={inputRef}
                type="text"
                placeholder="name"
                className={`filter-link input-filter-name ${
                  currentTab === 'name' ? 'filter-active' : ''
                }`}
                value={searchTerm}
                onChange={handleInputChange}
              />
            ) : (
              <span>{searchTerm ? searchTerm : 'name'}</span>
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
