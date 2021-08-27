import React from 'react';
import { useDevPanelContext } from 'modules/dev-panel/DevPanelProvider';
import Button from 'components/ui/Button/Button';
import classNames from 'classnames';
import startPanelStyle from 'modules/dev-panel/DevPanel.module.scss';

const DevPanel = () => {
  const {
    generateContent,
    generateMigrations,
    registerRouters,
    isProcessing,
    migrate,
  } = useDevPanelContext();

  return (
    <div
      className={classNames('wrapper', startPanelStyle.main, {
        [startPanelStyle.isProcessing]: isProcessing,
      })}>
      <div className="mb-20">
        <Button
          title={'Reset content'}
          onClickHandler={generateContent}
          buttonStyle="danger"
        />
        <span className="pl-4">
          <Button
            title={'Apply migrations'}
            onClickHandler={migrate}
            buttonStyle="info"
          />
        </span>
        <span className="pl-4">
          <Button
            title={'Generate migrations'}
            onClickHandler={generateMigrations}
            buttonStyle="info"
          />
        </span>{' '}
        <span className="pl-4">
          <Button
            title={'Register routers'}
            onClickHandler={registerRouters}
            buttonStyle="info"
          />
        </span>
      </div>
    </div>
  );
};

export default DevPanel;
