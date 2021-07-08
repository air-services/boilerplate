import React from 'react';

interface PaginationInfoModel {
  page: number;
  limit: number;
  count: number;
}

const getFromElement = ({ page, limit, count }: PaginationInfoModel) => {
  const from = 1 + (page - 1) * limit;
  return from > count ? count : from;
};

const getToElement = ({ page, limit, count }: PaginationInfoModel) => {
  const to = page * limit > count ? count : page * limit;
  return to > count ? count : to;
};

const PaginationInfo = ({ page, limit, count }: PaginationInfoModel) => {
  return (
    <div>
      <p className="text-sm text-gray-700">
        Отображено{' '}
        <span className="font-medium">
          с {getFromElement({ page, limit, count })}
        </span>{' '}
        по{' '}
        <span className="font-medium">
          {getToElement({ page, limit, count })}
        </span>{' '}
        элементов <span className="font-medium">из {count}</span>
      </p>
    </div>
  );
};

export default PaginationInfo;
