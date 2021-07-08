import React, { useCallback } from 'react';
import controlsStyle from './PaginationControls.module.scss';

interface MovePageModel {
  page: number;
  setPage(page: number): void;
  pages: number;
}

export const PaginationPrevious = ({ page, setPage, pages }: MovePageModel) => {
  const onClickHandler = useCallback(() => {
    if (page !== 1) {
      setPage(page - 1);
    }
  }, [page, pages]);


  return (
    <a className={controlsStyle.controlPrev} onClick={onClickHandler}>
      <span className="sr-only">Previous</span>
      <svg
        className="h-5 w-5"
        x-description="Heroicon name: solid/chevron-left"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </a>
  );
};

export const PaginationNext = ({ page, setPage, pages }: MovePageModel) => {
  const onClickHandler = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  return (
    <a className={controlsStyle.controlNext} onClick={onClickHandler}>
      <span className="sr-only">Next</span>
      <svg
        className="h-5 w-5"
        x-description="Heroicon name: solid/chevron-right"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </a>
  );
};

export const PaginationSmallControls = () => {
  return (
    <div className="flex-1 flex justify-between sm:hidden">
      <a
        href="#"
        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        Назад
      </a>
      <a
        href="#"
        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        Вперед
      </a>
    </div>
  );
};
