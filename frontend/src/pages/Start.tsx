import React from 'react';
import Dropdown, {
  DropdownWrapper,
  useDropdown,
} from 'components/ui/Dropdown/Dropdown';

const Start = () => {
  const { isOpen, setIsOpen, close } = useDropdown();

  return (
    <>
      <h1
        onClick={() => {
          setIsOpen(!isOpen);
        }}>
        start page
      </h1>
      <DropdownWrapper>
        <Dropdown close={close} isOpen={isOpen}>
          content
        </Dropdown>
      </DropdownWrapper>
    </>
  );
};

export default Start;
