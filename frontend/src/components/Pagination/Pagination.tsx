import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';

interface Props {
  onSetCurrentPage: (num: number) => void;
  nPages: number;
  currentPage: number;
}

const Pagination: React.FC<Props> = ({
  onSetCurrentPage,
  nPages,
  currentPage,
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
      router.pathname === '/tours/all/pageNum]' &&
      params &&
      !pageNumbers.includes(parseInt(params.pageNum))
    ) {
      void router.push('/tours/all/1');
    }
  }, [params, onSetCurrentPage, pageNumbers, router]);

  return (
    <>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((pgNumber) => (
            <li
              onClick={() => {
                void router.push(`/tours/all/${pgNumber}`);
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
