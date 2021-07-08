import React, { useCallback } from 'react';
import Button from 'components/ui/Button/Button';

const RemoveItemButton =( {id, onRemove}: { id: string, onRemove(id: string): void}) => {
  const onClickHandler = useCallback(() => {
    onRemove(id);
  }, []);
  return (
      <Button title={'Удалить'}  onClickHandler={onClickHandler} buttonStyle={'danger'} />
  );
};

export default RemoveItemButton;
