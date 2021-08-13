import React, {
  useCallback,
  useState,
  createContext,
  useContext,
  useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
  OrderType,
  RestModelApi,
  RestModelApiSorting,
} from 'services/api/rest';
import apiClient from 'axios';
import { serializeToCamel, stringToSnakeCase } from 'services/api/serializers';

export interface TableConfig {
  limit: number;
  fields: any[];
  api: RestModelApi;
  editUrl: string;
  createUrl: string;
  createLabel: string;
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

export const defaultSortingState = (): RestModelApiSorting => {
  return {
    order: 'ASC',
    field: 'id',
  };
};

export const defaultPaginationState = (page: number = 1): PaginationModel => {
  return { page, pages: 0, count: 0 };
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TableContextProvider = ({
  children,
  config,
}: {
  children: any;
  config: TableConfig;
}) => {
  const history = useHistory();
  const query = useQuery();

  const urlPagination: { page: number } = JSON.parse(
    query.get('pagination') || '{"page": 1}'
  );

  const urlSorting: { field: string; order: OrderType } = JSON.parse(
    query.get('sorting') ||
      JSON.stringify({
        order: 'ASC',
        field: config.fields[0].id,
      })
  );

  const [sorting, setSorting] = useState(urlSorting);

  const [tableState, setTableState] = useState(defaultTableState());
  const [pagination, setPagination] = useState(
    defaultPaginationState(urlPagination.page)
  );

  const loadItems = useCallback(() => {
    config.api
      .getList({
        pagination: { limit: config.limit, page: pagination.page },
        sorting: {
          order: sorting.order,
          field: stringToSnakeCase(sorting.field),
        },
      })
      .then((response) => {
        const { items, count } = response.data;
        setTableState((state) => ({
          ...state,
          items: serializeToCamel(items),
        }));
        setPagination((state) => ({
          ...state,
          count,
          pages: Math.ceil(count / config.limit),
        }));
      });
  }, [pagination, sorting]);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.append(
      'pagination',
      JSON.stringify({ page: pagination.page })
    );
    searchParams.append('sorting', JSON.stringify(sorting));

    history.push({
      search: searchParams.toString(),
    });
  }, [pagination, sorting]);

  useEffect(loadItems, [pagination.page, sorting]);

  const removeItem = useCallback(
    (id: string) => {
      config.api.removeItem(id).then(loadItems);
    },
    [pagination]
  );

  const setPage = useCallback((page: number) => {
    setPagination((state) => ({ ...state, page }));
  }, []);

  return (
    <TableContext.Provider
      value={{
        state: tableState,
        pagination,
        setPage,
        setSorting,
        sorting,
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
  loadItems: () => {},
  removeItem: (id: string) => {},

  setSorting: (sorting: RestModelApiSorting) => {},
  sorting: defaultSortingState(),

  setPage: (page: number) => {},
  pagination: defaultPaginationState(),

  state: defaultTableState(),
  config: {
    limit: 5,
    fields: defaultFields,
    editUrl: '',
    createUrl: '',
    createLabel: '',
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
