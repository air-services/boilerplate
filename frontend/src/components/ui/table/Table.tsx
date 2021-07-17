import React from 'react';
import TableElement, {
  TableField,
} from 'components/ui/table/TableElement/TableElement';
import tableStyles from 'components/ui/table/Table.module.scss';
import Processing from 'components/ui/Processing/Processing';
import TableProvider, {
  useTableContext,
  TableConfig,
} from 'components/ui/table/TableProvider';
import Pagination from 'components/ui/Pagination/Pagination';
import TableHead from 'components/ui/table/TableHead';

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
      </table>
    </div>
  );
};

const Table = ({ tableConfig }: { tableConfig: TableConfig }) => {
  return (
    <TableProvider config={tableConfig}>
      <TableView />
      <Pagination />
    </TableProvider>
  );
};

export default Table;
