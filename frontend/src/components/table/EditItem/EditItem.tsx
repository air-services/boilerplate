import { Link } from 'react-router-dom';
import React from 'react';

const EditItem = ({ id, baseUrl }: { id: string, baseUrl: string }) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <Link
        to={`/${baseUrl}/${id}`}
        className="text-indigo-600 hover:text-indigo-900">
        Редактировать
      </Link>
    </td>
  );
};

export default EditItem;