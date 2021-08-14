import React from 'react';
import tableStyles from 'components/ui/table/Table.module.scss';

import TableElement from 'components/ui/table/TableElement/TableElement';
import TableProvider, {
  useTableContext,
  TableConfig,
} from 'components/ui/table/TableProvider';
import Pagination from 'components/ui/Pagination/Pagination';
import TableHead from 'components/ui/table/TableHead';
import Button from 'components/ui/Button/Button';
import classNames from 'classnames';

const TableView = () => {
  const table = useTableContext();

  return (
    <div
      className={classNames(tableStyles.wrapper, {
        [tableStyles.isLoaded]: table.state.isLoaded,
      })}>
      <h2 className={tableStyles.title}>{table.config.title}</h2>
      <table className={tableStyles.main}>
        <TableHead />
        <tbody
          className={classNames(tableStyles.body, {
            [tableStyles.isProcessing]: table.state.isProcessing,
          })}>
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
        {table.state.isLoaded && (
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
        )}
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
