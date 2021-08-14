import React from 'react';
import pageStyles from './Page.module.scss';

const Page = ({ children }: { children: any }) => {
  return <div className={pageStyles.main}>{children}</div>;
};

export default Page;
