import React from 'react';

import StartPanelCard, {
  StartPanelCardProps,
} from 'modules/start-panel/StartPanelCard';
import { useStartPanelContext } from 'modules/start-panel/StartPanelProvider';
import Button from 'components/ui/Button/Button';
import classNames from 'classnames';
import startPanelStyle from './StartPanel.module.scss';

const StartPanel = () => {
  const { cards, generateContent, isProcessing } = useStartPanelContext();

  return (
    <div
      className={classNames('wrapper -mx-20 -my-10', startPanelStyle.main, {
        [startPanelStyle.isProcessing]: isProcessing,
      })}>
      <div className="bg-blue-300 pt-14 pb-28 px-3 md:px-8 h-auto">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
            {cards.length > 0 &&
              cards.map((card: StartPanelCardProps) => {
                return <StartPanelCard {...card} key={card.title} />;
              })}
          </div>
        </div>
      </div>
      <div className="px-3 md:px-8 h-auto -mt-24">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 px-4 mb-16">
            <div className="w-full bg-white rounded-xl overflow-hdden shadow-md p-4 undefined">
              <div className="bg-gradient-to-tr from-purple-500 to-purple-700 -mt-10 mb-4 rounded-xl text-white grid items-center w-full h-24 py-4 px-8 justify-start shadow-lg-purple undefined">
                <h2 className="text-white text-2xl">Projects tracker</h2>
              </div>
              <div className="p-4 undefined">
                <div className="overflow-x-auto">
                  <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                      <tr>
                        <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                          Project
                        </th>
                        <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                          Budget
                        </th>
                        <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                          Status
                        </th>
                        <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                          Completion
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          Argon Design System
                        </th>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          $2,500 USD
                        </th>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          <i className="fas fa-circle fa-sm text-red-500 mr-2" />{' '}
                          pending
                        </th>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          <div className="overflow-hidden h-2 flex rounded bg-red-200">
                            <div
                              className="flex justify-center items-center rounded text-xs font-medium bg-red-500 text-white"
                              style={{ width: '0%' }}
                            />
                          </div>
                        </th>
                      </tr>
                      <tr>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          Black Dashboard Sketch
                        </th>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          $1,800 USD
                        </th>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          <i className="fas fa-circle fa-sm text-yellow-500 mr-2" />{' '}
                          in progress
                        </th>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          <div className="overflow-hidden h-2 flex rounded bg-yellow-200">
                            <div
                              className="flex justify-center items-center rounded text-xs font-medium bg-yellow-500 text-white"
                              style={{ width: '30%' }}
                            />
                          </div>
                        </th>
                      </tr>
                      <tr>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          React Material Dashboard
                        </th>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          $2,200 USD
                        </th>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          <i className="fas fa-circle fa-sm text-green-500 mr-2" />{' '}
                          completed
                        </th>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          <div className="overflow-hidden h-2 flex rounded bg-green-200">
                            <div
                              className="flex justify-center items-center rounded text-xs font-medium bg-green-500 text-white"
                              style={{ width: '100%' }}
                            />
                          </div>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-16 mb-20">
        <Button
          title={isProcessing ? '...loading' : 'RESET CONTENT'}
          onClickHandler={generateContent}
          buttonStyle="danger"
        />
      </div>
      <footer className="py-6 px-16 border-t border-gray-200 font-light flex flex-col lg:flex-row justify-between items-center">
        <p className="text-gray-700 mb-6 lg:mb-0">
          Copyright © 2021{' '}
          <a
            href="https://www.creative-tim.com?ref=mtdk"
            target="_blank"
            rel="noreferrer"
            className="text-light-blue-500 hover:text-light-blue-700">
            FastAPI admin
          </a>
        </p>
        <ul className="list-unstyled flex">
          <li className="mr-6">
            <a
              className="text-gray-700 hover:text-gray-900 font-medium block text-sm"
              target="_blank"
              rel="noreferrer"
              href="">
              Documentation
            </a>
          </li>
          <li className="mr-6">
            <a
              className="text-gray-700 hover:text-gray-900 font-medium block text-sm"
              target="_blank"
              rel="noreferrer"
              href="">
              MIT License
            </a>
          </li>
          <li>
            <a
              className="text-gray-700 hover:text-gray-900 font-medium block text-sm"
              target="_blank"
              rel="noreferrer"
              href="">
              Github
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default StartPanel;
