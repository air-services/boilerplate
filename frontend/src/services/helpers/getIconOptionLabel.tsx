import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const getIconOptionLabel: any = ({ name }: any) => {
  return (
    <div>
      <span className="mr-2">{name}</span>
      {name && <FontAwesomeIcon className="mr-2 text-sm" icon={name} />}
    </div>
  );
};

export default getIconOptionLabel;
