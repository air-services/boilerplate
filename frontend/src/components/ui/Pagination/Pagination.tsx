import React from 'react';
import paginationStyle from './Pagination.module.scss';
import {
  PaginationNext,
  PaginationPrevious,
  PaginationSmallControls,
} from 'components/ui/Pagination/PaginationControls';
import { useTableContext } from 'components/ui/table/TableProvider';
import calculatePagination from 'components/ui/Pagination/calculatePagination';
import PaginationPage from 'components/ui/Pagination/PatinationPage';
import PaginationInfo from 'components/ui/Pagination/PaginationInfo';

const Pagination = () => {
  const table = useTableContext();
  const { page, pages, count } = table.pagination;
  const { limit } = table.config;
  const pagination = calculatePagination({
    page,
    pages,
  });

  return (
    <div className={paginationStyle.wrapper}>
      <PaginationSmallControls />
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <PaginationInfo page={page} limit={limit} count={count} />
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination">
            <PaginationPrevious page={page} pages={pages} setPage={table.setPage} />
            {pagination.map((page: number) => {
              return (
                <PaginationPage
                  setPage={table.setPage}
                  page={page}
                  activePage={table.pagination.page}
                  key={page}
                />
              );
            })}
            <PaginationNext page={page} pages={pages} setPage={table.setPage} />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
