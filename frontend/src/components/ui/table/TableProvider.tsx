import React, {
  useCallback,
  useState,
  createContext,
  useContext,
  useEffect,
} from 'react';
import { RestModelApi } from 'services/api/rest';
import apiClient from 'axios';

export interface TableConfig {
  limit: number;
  fields: any[];
  api: RestModelApi;
  editUrl: string;
}

export interface TableStateModel {
  items: any[];
  isProcessing: boolean;
}

export interface PaginationModel {
  count: number;
  page: number;
  pages: number;
}

export const defaultTableState = (): TableStateModel => {
  return {
    items: [],
    isProcessing: false,
  };
};

export const defaultPaginationState = (): PaginationModel => {
  return { page: 1, pages: 0, count: 0 };
};

const TableContextProvider = ({
  children,
  config,
}: {
  children: any;
  config: TableConfig;
}) => {
  const [tableState, setTableState] = useState(defaultTableState());
  const [pagination, setPagination] = useState(defaultPaginationState());

  const loadItems = useCallback(() => {
    config.api
      .getList({ pagination: { limit: config.limit, page: pagination.page } })
      .then((response) => {
        const { items, count } = response.data;
        setTableState((state) => ({ ...state, items }));
        setPagination((state) => ({
          ...state,
          count,
          pages: Math.ceil(count / config.limit),
        }));
      });
  }, [pagination]);

  useEffect(loadItems, [pagination.page]);

  const removeItem = useCallback(
    (id: string) => {
      config.api.removeItem(id).then(loadItems);
    },
    [pagination]
  );

  const setPage = useCallback((page: number) => {
    setPagination((state) => ({ ...state, page }));
  }, []);

  // load items on start
  useEffect(() => {
    loadItems();
  }, []);

  return (
    <TableContext.Provider
      value={{
        state: tableState,
        pagination,
        setPage,
        loadItems,
        removeItem,
        config,
      }}>
      {children}
    </TableContext.Provider>
  );
};

const defaultFields: any[] = [];

const TableContext = createContext({
  pagination: defaultPaginationState(),
  setPage: (page: number) => {},
  state: defaultTableState(),
  loadItems: () => {},
  removeItem: (id: string) => {},
  config: {
    limit: 5,
    fields: defaultFields,
    editUrl: '',
    api: {
      getList: (config: any) => {
        return apiClient.get('/');
      },
      getItem: (id: string) => {
        return apiClient.get('/');
      },
      removeItem: (id: string) => {
        return apiClient.get('/');
      },
      patchItem: (id: string, data: any) => {
        return apiClient.get('/');
      },
    },
  },
});

export const useTableContext = () => {
  return useContext(TableContext);
};

export default TableContextProvider;
