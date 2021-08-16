import React from 'react';
import StartPanel from 'modules/start-panel/StartPanel';
import StartPanelProvider from 'modules/start-panel/StartPanelProvider';

const Start = () => {
  return (
    <StartPanelProvider>
      <StartPanel />
    </StartPanelProvider>
  );
};

export default Start;
