import React from 'react';
import ApplicationDataList from 'modules/constructor/data/AppliationData/ApplicationDataList';
import useApplicationData from 'pages/constructor/data/useApplicationData';

const ApplicationDataListPage = () => {
  const applicationData = useApplicationData();
  return applicationData ? (
    <ApplicationDataList application={applicationData} />
  ) : null;
};

export default ApplicationDataListPage;
