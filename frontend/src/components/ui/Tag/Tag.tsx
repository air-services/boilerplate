import React from 'react';
import tagStyle from './Tag.module.scss';
import classNames from 'classnames';

export enum TagStyle {
  success = 'success',
  danger = 'danger',
  info = 'info',
  link = 'link',
  warning = 'warning',
}
const Tag = ({ style, text }: { style: TagStyle; text: string }) => {
  return (
    <div className={classNames(tagStyle.main, tagStyle[style])}>{text}</div>
  );
};

export default Tag;
