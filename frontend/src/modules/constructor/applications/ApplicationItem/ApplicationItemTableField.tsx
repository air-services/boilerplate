import React from 'react';
import {
  DataType,
  ApplicationField,
  DataTypesCache,
  FieldsCache,
} from 'modules/constructor/applications/constructorModels';
import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';
import Async from 'react-select/async';
import constructorStyle from 'modules/constructor/applications/ApplicationList.module.scss';
import Button from 'components/ui/Button/Button';
import restApi from 'services/api/rest';

const ApplicationItemTableField = ({
  field,
  index,
  remove,
  dataTypesCache,
  fieldsCache,
}: {
  field: ApplicationField;
  index: number;
  dataTypesCache: DataTypesCache;
  fieldsCache: FieldsCache;
  remove(id: number): void;
}) => {
  const { register, control } = useFormContext();

  return (
    <tr>
      <td className={constructorStyle.tableBodyItem}>
        <input
          className={constructorStyle.input}
          defaultValue={field.name}
          {...register(`fields.${index}.name`)}
        />
      </td>
      <td className={constructorStyle.tableBodyItem}>
        <input
          className={constructorStyle.input}
          defaultValue={field.description}
          {...register(`fields.${index}.description`)}
        />
      </td>
      <td
        className={constructorStyle.tableBodyItem}
        style={{ minWidth: '150px' }}>
        <Controller
          name={`fields.${index}.dataTypeId`}
          defaultValue={field.dataTypeId}
          render={({ field: { onChange } }) => {
            return (
              <Select
                className="basic-single"
                classNamePrefix="select"
                options={Object.values(dataTypesCache)}
                getOptionLabel={(dataType: any) => {
                  return dataType.name;
                }}
                getOptionValue={(dataType: DataType) => {
                  return String(dataType.id);
                }}
                defaultValue={dataTypesCache[field.dataTypeId]}
                onChange={(nextValue: any) => {
                  onChange(nextValue.id);
                }}
              />
            );
          }}
          control={control}
        />
      </td>

      <td
        className={constructorStyle.tableBodyItem}
        style={{ minWidth: '150px' }}>
        <Controller
          name={`fields.${index}.foreignKeyId`}
          defaultValue={field.foreignKeyId}
          render={({ field: { onChange, value } }) => {
            return (
              <Async
                className="basic-single"
                classNamePrefix="select"
                options={Object.values(fieldsCache)}
                defaultOptions
                isClearable
                getOptionLabel={(foreignKey: any) => {
                  const prefix = foreignKey.application
                    ? `${foreignKey.application.name}.`
                    : '';
                  return `${prefix}${foreignKey.name}`;
                }}
                defaultValue={
                  (field.foreignKeyId && fieldsCache[field.foreignKeyId]) ||
                  null
                }
                getOptionValue={(foreignKey: any) => {
                  return String(foreignKey.id);
                }}
                onChange={(nextValue: any) => {
                  onChange(nextValue && nextValue.id);
                }}
                loadOptions={(inputValue: string) => {
                  return new Promise((resolve) => {
                    restApi.api.fields
                      .getList({
                        search: [
                          {
                            field: 'name',
                            value: inputValue,
                            operator: 'like',
                          },
                        ],
                      })
                      .then((response) => {
                        resolve(response.data.items);
                      });
                  });
                }}
              />
            );
          }}
          control={control}
        />
      </td>

      <td className={constructorStyle.tableBodyItem}>
        <input
          className={constructorStyle.input}
          defaultValue={field.size}
          {...register(`fields.${index}.size`)}
        />
      </td>

      <td className={constructorStyle.tableBodyItem}>
        <input
          type="checkbox"
          className={constructorStyle.input}
          defaultChecked={field.isPrimaryKey}
          {...register(`fields.${index}.isPrimaryKey`)}
        />
      </td>

      <td className={constructorStyle.tableBodyItem}>
        <input
          type="checkbox"
          className={constructorStyle.input}
          defaultChecked={field.isIndex}
          {...register(`fields.${index}.isIndex`)}
        />
      </td>

      <td className={constructorStyle.tableBodyItem}>
        <Button
          icon="trash-alt"
          buttonStyle="danger"
          buttonType="button"
          onClickHandler={() => {
            remove(index);
          }}
        />
      </td>
    </tr>
  );
};

export default ApplicationItemTableField;
