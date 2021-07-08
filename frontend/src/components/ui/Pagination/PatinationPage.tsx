import paginationStyle from 'components/ui/Pagination/Pagination.module.scss';
import React, { useCallback } from 'react';
import classNames from 'classnames';

const Separator = () => <span className={paginationStyle.separator}>...</span>;

const PaginationPage = ({
  page,
  activePage,
  setPage,
}: {
  page: number;
  activePage: number;
  setPage(page: number): void;
}) => {
  if (page < 0) {
    return <Separator />;
  }
  const onClickHandler = useCallback(() => {
    setPage(page);
  }, []);

  return (
    <a
      className={classNames({
        [paginationStyle.current]: page === activePage,
        [paginationStyle.page]: page !== activePage,
      })}
      onClick={onClickHandler}>
      {page}
    </a>
  );
};

export default PaginationPage;
