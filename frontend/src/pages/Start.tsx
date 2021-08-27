import React from 'react';
import DevPanel from 'modules/dev-panel/DevPanel';
import DevPanelProvider from 'modules/dev-panel/DevPanelProvider';

const Dev = () => {
  return (
    <DevPanelProvider>
      <DevPanel />
    </DevPanelProvider>
  );
};

export default Dev;
