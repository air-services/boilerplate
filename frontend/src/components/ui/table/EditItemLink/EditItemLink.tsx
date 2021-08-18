import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/ui/Button/Button';

const EditItemLink = ({ id, editUrl }: { id: string; editUrl: string }) => {
  return (
    <Link to={`/${editUrl}/${id}`}>
      <Button icon="edit" />
    </Link>
  );
};

export default EditItemLink;
