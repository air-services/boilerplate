import React from 'react';
import { useTableContext } from 'components/ui/table/TableProvider';
import EditItemLink from 'components/ui/table/EditItemLink/EditItemLink';
import RemoveItemButton from 'components/ui/table/RemoveButton/RemoveButton';
import Dropdown, {
  DropdownWrapper,
  useDropdown,
} from 'components/ui/Dropdown/Dropdown';

import itemActionsStyle from './ItemActions.module.scss';
import classNames from 'classnames';

const ItemActions = ({ id }: { id: string; name: string }) => {
  const table = useTableContext();
  const { isOpen, close, toggle } = useDropdown();

  return (
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-1">
      <EditItemLink id={id} editUrl={table.config.editUrl} />
      <RemoveItemButton id={id} onRemove={table.removeItem} />
    </td>
  );
};

export default ItemActions;
