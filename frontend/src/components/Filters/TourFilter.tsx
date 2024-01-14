import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import {
  fetchTours,
  fetchToursByFilter,
  fetchToursByPrice,
} from '@/containers/tours/toursThunk';
import magnifierIcon from '@/assets/images/magnifier.svg';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const categoriesData = [
  { id: 'checkbox-1', label: 'history' },
  { id: 'checkbox-2', label: 'budget' },
  { id: 'checkbox-3', label: 'popular' },
  { id: 'checkbox-4', label: 'vacation' },
  { id: 'checkbox-5', label: 'exotic' },
];

type TCurrentTab = 'name' | 'categories' | 'min' | 'max';

const TourFilter = () => {
  const params = useParams() as { pageNum: string };
  const limitTours = 6;

  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState<TCurrentTab | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (params) {
      setCurrentPage(parseInt(params.pageNum));
    }
  }, [params]);

  const indexOfLastRecord = currentPage * limitTours;
  const indexOfFirstRecord = indexOfLastRecord - limitTours;

  const fetchByType = async () => {
    if ((currentTab === 'name' && searchTerm.length) || searchTerm.length) {
      dispatch(
        fetchToursByFilter({
          type: currentTab ?? 'name',
          value: searchTerm,
          skip: indexOfFirstRecord,
          limit: limitTours,
        }),
      );
    } else if (currentTab === 'min' || currentTab === 'max') {
      dispatch(
        fetchToursByPrice({
          type: currentTab,
          skip: indexOfFirstRecord,
          limit: limitTours,
        }),
      );
    } else if (currentTab === 'categories' && selectedCategories.length) {
      dispatch(
        fetchToursByFilter({
          type: currentTab,
          value: selectedCategories.join(','),
          skip: indexOfFirstRecord,
          limit: limitTours,
        }),
      );
    } else {
      dispatch(fetchTours({ skip: indexOfFirstRecord, limit: limitTours }));
    }
  };

  const toggleCategory = async (label: string) => {
    const updatedCategories = selectedCategories.includes(label)
      ? selectedCategories.filter((value) => value !== label)
      : [...selectedCategories, label];

    setSelectedCategories(updatedCategories);
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

  const clearCategory = () => {
    setSelectedCategories([]);
    setShowCategories(false);
  };

  return (
    <section className="section-filter" ref={filterRef}>
      <ul className="filters-list">
        <li
          className="tab-filter"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentTab('name');
            clearCategory();
          }}
        >
          <button
            className={`${
              currentTab === 'name'
                ? 'filter-input filter-active'
                : 'filter-link'
            }`}
          >
            <span className="icon-filter"></span>
            {currentTab === 'name' ? (
              <input
                ref={inputRef}
                type="text"
                placeholder="name"
                className={`filter-link input-filter-name ${
                  currentTab === 'name' ? 'filter-active' : ''
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            ) : (
              <span
                style={{ textTransform: searchTerm ? 'initial' : 'uppercase' }}
              >
                {searchTerm || 'name'}
              </span>
            )}
          </button>
        </li>
        <li
          className="tab-filter"
          onClick={() => {
            setCurrentTab('min');
            clearCategory();
          }}
        >
          <button
            className={`filter-link ${
              currentTab === 'min' ? 'filter-active' : ''
            }`}
          >
            <span className="icon-filter"></span>
            <span>Price Low to High</span>
          </button>
        </li>
        <li
          className="tab-filter"
          onClick={() => {
            setCurrentTab('max');
            clearCategory();
          }}
        >
          <button
            className={`filter-link ${
              currentTab === 'max' ? 'filter-active' : ''
            }`}
          >
            <span className="icon-filter"></span>
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
            <span className="icon-filter"></span>
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
        <button className="filter-btn" onClick={fetchByType}>
          <Image
            width={16}
            height={16}
            src={magnifierIcon.src}
            alt="magnifier-icon"
          />
          Search
        </button>
      </ul>
    </section>
  );
};

export default TourFilter;
