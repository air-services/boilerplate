export const stringToCamelCase = (s: string) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

export const stringToSnakeCase = (input: string) =>
  input.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const serializeObjectData = (
  data: any,
  fieldNameConverter: any
): any => {
  if (Array.isArray(data)) {
    return data.map((arrayElement) => {
      return serializeObjectData(arrayElement, fieldNameConverter);
    });
  }

  return Object.keys(data).reduce((result: any, fieldName: string) => {
    const nextFieldName = fieldNameConverter(fieldName);
    const prevValue = data[fieldName];
    const nextValue: any =
      prevValue instanceof Object
        ? serializeObjectData(prevValue, fieldNameConverter)
        : prevValue;

    return {
      ...result,
      [nextFieldName]: nextValue,
    };
  }, {});
};

export const serializeToCamel = (data: any) =>
  serializeObjectData(data, stringToCamelCase);

export const serializeToSnake = (data: any) =>
  serializeObjectData(data, stringToSnakeCase);

export const excludeKeys = (excludeField: string) => (data: any) => {
  return Object.keys(data).reduce((result: any, field: any) => {
    return {
      ...result,
      ...(field === excludeField ? {} : { [field]: data[field] }),
    };
  }, {});
};
