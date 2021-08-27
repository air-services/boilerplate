import { useEffect, useState } from 'react';
import restApi from 'services/api/rest';
import { AxiosResponse } from 'axios';
import { serializeToCamel } from 'services/api/serializers';
import { useRouteMatch } from 'react-router-dom';
import { Application } from 'modules/constructor/applications/constructorModels';

const defaultApplications = (): Application[] => [];

const excludeIdFromFields = (application: Application) => ({
  ...application,
  fields: application.fields.filter((field) => field.name !== 'id'),
});

const useApplicationData = () => {
  const [applications, setApplications] = useState(defaultApplications());

  useEffect(() => {
    restApi.api.applications.getList().then((response: AxiosResponse) => {
      setApplications(serializeToCamel(response.data.items));
    });
  }, []);

  const match: { params: { application: string } } = useRouteMatch();
  const {
    params: { application },
  } = match;

  const applicationData = applications.find(
    (item) => item.tableName === application
  );

  return applicationData && excludeIdFromFields(applicationData);
};

export default useApplicationData;
