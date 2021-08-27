import React from 'react';
import ApplicationDataEdit from 'modules/constructor/data/AppliationData/ApplicationDataEdit';
import useApplicationData from 'pages/constructor/data/useApplicationData';

const ApplicationDataEditPage = () => {
  const applicationData = useApplicationData();

  return applicationData ? (
    <ApplicationDataEdit application={applicationData} />
  ) : null;
};

export default ApplicationDataEditPage;
