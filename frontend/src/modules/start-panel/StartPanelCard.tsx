import React from 'react';

import classNames from 'classnames';

type StartPanelCardDirection = 'up' | 'down';

export interface StartPanelCardProps {
  title: string;
  value: string;
  icon: { name: string };
  color: string;
  change: string;
  changeTitle: string;
  direction: StartPanelCardDirection;
}

const StartPanelCard = ({
  title,
  value,
  icon,
  color,
  direction,
  change,
  changeTitle,
}: StartPanelCardProps) => {
  return (
    <div className="px-4 mb-10">
      <div className="w-full bg-white rounded-xl overflow-hdden shadow-md p-4 undefined">
        <div className="flex flex-wrap border-b border-gray-200 undefined">
          <div
            className={classNames(
              'bg-gradient-to-tr -mt-10 mb-4 rounded-xl text-white grid items-center w-24 h-24 py-4 px-4 justify-center mb-0',
              color
            )}>
            <span className="material-icons text-white text-3xl leading-none">
              {icon.name}
            </span>
          </div>
          <div className="w-full pl-4 max-w-full flex-grow flex-1 mb-2 text-right undefined">
            <h5 className="text-gray-500 font-light tracking-wide text-base mb-1">
              {title}
            </h5>
            <span className="text-3xl text-gray-900">{value}</span>
          </div>
        </div>
        <div className="text-sm text-gray-700 pt-4 flex items-center undefined">
          {direction === 'up' && (
            <span className="material-icons text-green-500 text-base leading-none">
              arrow_upward
            </span>
          )}
          {direction === 'down' && (
            <span className="material-icons text-red-500 text-base leading-none">
              arrow_downward
            </span>
          )}
          <span
            className={classNames('ml-1 mr-2', {
              ['text-green-500']: direction == 'up',
              ['text-red-500']: direction == 'down',
            })}>
            {change}
          </span>
          <span className="font-light whitespace-nowrap">{changeTitle}</span>
        </div>
      </div>
    </div>
  );
};

export default StartPanelCard;
