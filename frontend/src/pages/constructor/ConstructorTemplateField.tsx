import React from 'react';
import { DataType, TemplateField } from 'pages/constructor/constructorModels';
import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';
import constructorStyle from 'pages/constructor/ConstructorPage.module.scss';
import Button from 'components/ui/Button/Button';

const ConstructorTemplateField = ({
  field,
  index,
  dataTypes,
  remove,
}: {
  field: TemplateField;
  index: number;
  dataTypes: { items: DataType[]; cache: { [id: string]: DataType } };
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
      <td className={constructorStyle.tableBodyItem}>
        <Controller
          name={`fields.${index}.data_type_id`}
          defaultValue={field.data_type_id}
          render={({ field: { onChange } }) => {
            return (
              <Select
                className="basic-single"
                classNamePrefix="select"
                options={dataTypes.items}
                getOptionLabel={(dataType: any) => {
                  return dataType.name;
                }}
                getOptionValue={(dataType: DataType) => {
                  return String(dataType.id);
                }}
                defaultValue={dataTypes.cache[field.data_type_id]}
                onChange={(nextValue: any) => {
                  onChange(nextValue.id);
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

export default ConstructorTemplateField;
