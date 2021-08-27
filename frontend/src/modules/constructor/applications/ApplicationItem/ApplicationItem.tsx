import React, { useState } from 'react';
import {
  Application,
  DataTypesCache,
  FieldsCache,
} from 'modules/constructor/applications/constructorModels';
import ApplicationItemTable from 'modules/constructor/applications/ApplicationItem/ApplicationItemTable';
import ApplicationItemNavigation, {
  ActiveTab,
} from 'modules/constructor/applications/ApplicationItem/ApplicationItemNavigation/ApplicationItemNavigation';

const defaultFieldValues = () => ({
  name: 'name',
  description: 'description',
  size: 8,
  dataTypeId: 1,
});

const defaultActiveTab = (): ActiveTab => 'Model';

const ApplicationItem = ({
  application,
  fieldsCache,
  dataTypesCache,
  remove,
}: {
  application: Application;
  fieldsCache: FieldsCache;
  dataTypesCache: DataTypesCache;
  remove(): void;
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab());

  return (
    <div className="my-10">
      <h1 className="text-xl">{application.name}</h1>
      <div className="w-full bg-white shadow-md px-4 pt-0 mt-8">
        <ApplicationItemNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {activeTab === 'Model' && (
          <ApplicationItemTable
            application={application}
            dataTypesCache={dataTypesCache}
            fieldsCache={fieldsCache}
            remove={remove}
          />
        )}
      </div>
    </div>
  );
};

export default ApplicationItem;
