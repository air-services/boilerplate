import React, { useEffect, useState } from 'react';
import rest from 'services/api/rest';
import { Template } from 'pages/constructor/constructorModels';
import ConstructorTemplateView from 'pages/constructor/ConstructorTemplateView';

const ConstructorPage = () => {
  const [templates, setTemplates] = useState({ isLoaded: false, items: [] });
  const [dataTypes, setDataTypes] = useState({
    isLoaded: false,
    items: [],
    cache: {},
  });

  useEffect(() => {
    rest.api.dataTypes
      .getList()
      .then((response) => {
        setDataTypes({
          isLoaded: true,
          items: response.data.items,
          cache: response.data.items.reduce(
            (cache: any, item: any) => ({ ...cache, [item.id]: item }),
            {}
          ),
        });
      })
      .then(() => {
        rest.api.templates.getList().then((response) => {
          setTemplates((prevValue) => ({
            isLoaded: true,
            items: response.data.items,
          }));
        });
      });
  }, []);

  return (
    <div className={'constructor'}>
      <h1 className="text-2xl">App constructor</h1>
      {templates.isLoaded &&
        templates.items.map((template: Template) => {
          return (
            <ConstructorTemplateView
              key={template.id}
              template={template}
              dataTypes={dataTypes}
            />
          );
        })}
    </div>
  );
};

export default ConstructorPage;
