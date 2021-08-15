import React, { useCallback, useState, createRef } from 'react';
import classNames from 'classnames';
import dropdownStyle from './Dropdown.module.scss';
import useOutsideClick from 'services/helpers/useOutsideClick';

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prevValue: boolean) => !prevValue);
  }, []);

  return { isOpen, setIsOpen, close, open, toggle };
};

const Dropdown = ({
  children,
  isOpen,
  close,
}: {
  children: JSX.Element[] | JSX.Element | string;
  isOpen: boolean;
  close(): void;
}) => {
  const dropdownRef = createRef<HTMLDivElement>();

  useOutsideClick(dropdownRef, () => {
    close();
  });

  return (
    <div
      ref={dropdownRef}
      className={classNames(dropdownStyle.main, {
        [dropdownStyle.show]: isOpen,
      })}>
      {children}
    </div>
  );
};

export const DropdownWrapper = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element | string;
}) => {
  return <div className={dropdownStyle.wrapper}>{children}</div>;
};

export default Dropdown;
