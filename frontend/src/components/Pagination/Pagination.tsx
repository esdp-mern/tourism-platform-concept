import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';

interface Props {
  onSetCurrentPage: (num: number) => void;
  nPages: number;
  currentPage: number;
  pathname: string;
}

const Pagination: React.FC<Props> = ({
  onSetCurrentPage,
  nPages,
  currentPage,
  pathname,
}) => {
  const params = useParams() as { pageNum: string };
  const router = useRouter();
  const pageNumbers: number[] = Array.from(
    { length: nPages },
    (_, index) => index + 1,
  );

  useEffect(() => {
    if (params) {
      onSetCurrentPage(parseInt(params.pageNum));
    }
    if (
      router.pathname === `${pathname}/pageNum]` &&
      params &&
      !pageNumbers.includes(parseInt(params.pageNum))
    ) {
      void router.push(`${pathname}1`);
    }
  }, [params, onSetCurrentPage, pageNumbers, router, pathname]);

  return (
    <>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((pgNumber) => (
            <li
              onClick={() => {
                void router.push(`${pathname}${pgNumber}`);
                onSetCurrentPage(pgNumber);
              }}
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
    </>
  );
};

export default Pagination;
