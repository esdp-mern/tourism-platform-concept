import React from 'react';

interface Props {
  setCurrentPage: (num: number) => void;
  nPages: number;
  currentPage: number;
}

const Pagination: React.FC<Props> = ({
  setCurrentPage,
  nPages,
  currentPage,
}) => {
  const pageNumbers: number[] = Array.from(
    { length: nPages },
    (_, index) => index + 1,
  );

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((pgNumber) => (
          <li
            onClick={() => setCurrentPage(pgNumber)}
            key={pgNumber}
            className={`page-item ${
              currentPage == pgNumber ? 'page-link-active' : ''
            } `}
          >
            <a className="page-link">{pgNumber}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
