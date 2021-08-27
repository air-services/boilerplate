import React from 'react';
import ApplicationDataCreate from 'modules/constructor/data/AppliationData/ApplicationDataCreate';
import useApplicationData from 'pages/constructor/data/useApplicationData';

const ApplicationDataCreatePage = () => {
  const applicationData = useApplicationData();

  return applicationData ? (
    <ApplicationDataCreate application={applicationData} />
  ) : null;
};

export default ApplicationDataCreatePage;
