import React from 'react';
import TableElement, {
  TableField,
} from 'components/ui/table/TableElement/TableElement';
import { Link } from 'react-router-dom';

import tableStyles from 'components/ui/table/Table.module.scss';
import Processing from 'components/ui/Processing/Processing';
import TableProvider, {
  useTableContext,
  TableConfig,
} from 'components/ui/table/TableProvider';
import Pagination from 'components/ui/Pagination/Pagination';
import TableHead from 'components/ui/table/TableHead';
import Button from 'components/ui/Button/Button';

const TableView = () => {
  const table = useTableContext();

  return (
    <div className="shadow relative">
      {table.state.isProcessing && (
        <div className={tableStyles.processingWrapper}>
          <Processing size="large" />
        </div>
      )}

      <table className={tableStyles.main}>
        <TableHead />
        <tbody className={tableStyles.body}>
          {table.state.items.map((item: any) => {
            return (
              <TableElement
                fields={table.config.fields}
                element={item}
                key={item.id}
              />
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={table.config.fields.length}>
              <Pagination />
              <div className="p-5">
                <Button
                  link={table.config.createUrl}
                  title={table.config.createLabel}
                />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

const Table = ({ tableConfig }: { tableConfig: TableConfig }) => {
  return (
    <TableProvider config={tableConfig}>
      <TableView />
    </TableProvider>
  );
};

export default Table;
