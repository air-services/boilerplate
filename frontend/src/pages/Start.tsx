import React from 'react';

const Start = () => {
  return (
    <div className="wrapper  -mx-20 -my-10">
      <div className="bg-blue-300 pt-14 pb-28 px-3 md:px-8 h-auto">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
            <div className="px-4 mb-10">
              <div className="w-full bg-white rounded-xl overflow-hdden shadow-md p-4 undefined">
                <div className="flex flex-wrap border-b border-gray-200 undefined">
                  <div className="bg-gradient-to-tr from-pink-500 to-pink-700 -mt-10 mb-4 rounded-xl text-white grid items-center w-24 h-24 py-4 px-4 justify-center shadow-lg-pink mb-0">
                    <span className="material-icons text-white text-3xl leading-none">
                      trending_up
                    </span>
                  </div>
                  <div className="w-full pl-4 max-w-full flex-grow flex-1 mb-2 text-right undefined">
                    <h5 className="text-gray-500 font-light tracking-wide text-base mb-1">
                      Traffic
                    </h5>
                    <span className="text-3xl text-gray-900">350,897</span>
                  </div>
                </div>
                <div className="text-sm text-gray-700 pt-4 flex items-center undefined">
                  <span className="material-icons text-green-500 text-base leading-none">
                    arrow_upward
                  </span>
                  <span className="text-green-500 ml-1 mr-2">3.48</span>
                  <span className="font-light whitespace-nowrap">
                    Since last month
                  </span>
                </div>
              </div>
            </div>
            <div className="px-4 mb-10">
              <div className="w-full bg-white rounded-xl overflow-hdden shadow-md p-4 undefined">
                <div className="flex flex-wrap border-b border-gray-200 undefined">
                  <div className="bg-gradient-to-tr from-red-500 to-red-700 -mt-10 mb-4 rounded-xl text-white grid items-center w-24 h-24 py-4 px-4 justify-center shadow-lg-red mb-0">
                    <span className="material-icons text-white text-3xl leading-none">
                      groups
                    </span>
                  </div>
                  <div className="w-full pl-4 max-w-full flex-grow flex-1 mb-2 text-right undefined">
                    <h5 className="text-gray-500 font-light tracking-wide text-base mb-1">
                      New Users
                    </h5>
                    <span className="text-3xl text-gray-900">2,356</span>
                  </div>
                </div>
                <div className="text-sm text-gray-700 pt-4 flex items-center undefined">
                  <span className="material-icons text-red-500 text-base leading-none">
                    arrow_downward
                  </span>
                  <span className="text-red-500 ml-1 mr-2">3.48</span>
                  <span className="font-light whitespace-nowrap">
                    Since last week
                  </span>
                </div>
              </div>
            </div>
            <div className="px-4 mb-10">
              <div className="w-full bg-white rounded-xl overflow-hdden shadow-md p-4 undefined">
                <div className="flex flex-wrap border-b border-gray-200 undefined">
                  <div className="bg-gradient-to-tr from-purple-500 to-purple-700 -mt-10 mb-4 rounded-xl text-white grid items-center w-24 h-24 py-4 px-4 justify-center shadow-lg-purple mb-0">
                    <span className="material-icons text-white text-3xl leading-none">
                      paid
                    </span>
                  </div>
                  <div className="w-full pl-4 max-w-full flex-grow flex-1 mb-2 text-right undefined">
                    <h5 className="text-gray-500 font-light tracking-wide text-base mb-1">
                      Sales
                    </h5>
                    <span className="text-3xl text-gray-900">924</span>
                  </div>
                </div>
                <div className="text-sm text-gray-700 pt-4 flex items-center undefined">
                  <span className="material-icons text-red-500 text-base leading-none">
                    arrow_downward
                  </span>
                  <span className="text-red-500 ml-1 mr-2">1.10</span>
                  <span className="font-light whitespace-nowrap">
                    Since yesterday
                  </span>
                </div>
              </div>
            </div>
            <div className="px-4 mb-10">
              <div className="w-full bg-white rounded-xl overflow-hdden shadow-md p-4 undefined">
                <div className="flex flex-wrap border-b border-gray-200 undefined">
                  <div className="bg-gradient-to-tr from-blue-500 to-blue-700 -mt-10 mb-4 rounded-xl text-white grid items-center w-24 h-24 py-4 px-4 justify-center shadow-lg-blue mb-0">
                    <span className="material-icons text-white text-3xl leading-none">
                      poll
                    </span>
                  </div>
                  <div className="w-full pl-4 max-w-full flex-grow flex-1 mb-2 text-right undefined">
                    <h5 className="text-gray-500 font-light tracking-wide text-base mb-1">
                      Performance
                    </h5>
                    <span className="text-3xl text-gray-900">49,65%</span>
                  </div>
                </div>
                <div className="text-sm text-gray-700 pt-4 flex items-center undefined">
                  <span className="material-icons text-green-500 text-base leading-none">
                    arrow_upward
                  </span>
                  <span className="text-green-500 ml-1 mr-2">12</span>
                  <span className="font-light whitespace-nowrap">
                    Since last month
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 md:px-8 h-auto -mt-24">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 px-4 mb-16">
            <div className="w-full bg-white rounded-xl overflow-hdden shadow-md p-4 undefined">
              <div className="bg-gradient-to-tr from-purple-500 to-purple-700 -mt-10 mb-4 rounded-xl text-white grid items-center w-full h-24 py-4 px-8 justify-start shadow-lg-purple undefined">
                <h2 className="text-white text-2xl">Card Table</h2>
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
                          Users
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
                          <div className="flex">
                            <div className="w-10 h-10 rounded-full border-2 border-white">
                              <img
                                alt="..."
                                src="https://demos.creative-tim.com/material-tailwind-dashboard-react/static/media/team-1-800x800.fa5a7ac2.jpg"
                                className="rounded-full  max-w-full h-auto align-middle border-none undefined"
                              />
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                              <img
                                alt="..."
                                src="https://demos.creative-tim.com/material-tailwind-dashboard-react/static/media/team-2-800x800.3e08ef14.jpg"
                                className="rounded-full  max-w-full h-auto align-middle border-none undefined"
                              />
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                              <img
                                alt="..."
                                src="https://demos.creative-tim.com/material-tailwind-dashboard-react/static/media/team-3-800x800.19201574.jpg"
                                className="rounded-full  max-w-full h-auto align-middle border-none undefined"
                              />
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                              <img
                                alt="..."
                                src="https://demos.creative-tim.com/material-tailwind-dashboard-react/static/media/team-4-470x470.4ef82ef4.png"
                                className="rounded-full  max-w-full h-auto align-middle border-none undefined"
                              />
                            </div>
                          </div>
                        </th>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          <div className="overflow-hidden h-2 flex rounded bg-red-200">
                            <div
                              className="flex justify-center items-center rounded text-xs font-medium bg-red-500 text-white"
                              style={{ width: '60%' }}
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
                          <i className="fas fa-circle fa-sm text-blue-gray-900 mr-2" />{' '}
                          completed
                        </th>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          <div className="flex">
                            <div className="w-10 h-10 rounded-full border-2 border-white">
                              <img
                                alt="..."
                                src="https://demos.creative-tim.com/material-tailwind-dashboard-react/static/media/team-1-800x800.fa5a7ac2.jpg"
                                className="rounded-full  max-w-full h-auto align-middle border-none undefined"
                              />
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                              <img
                                alt="..."
                                src="https://demos.creative-tim.com/material-tailwind-dashboard-react/static/media/team-2-800x800.3e08ef14.jpg"
                                className="rounded-full  max-w-full h-auto align-middle border-none undefined"
                              />
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                              <img
                                alt="..."
                                src="https://demos.creative-tim.com/material-tailwind-dashboard-react/static/media/team-3-800x800.19201574.jpg"
                                className="rounded-full  max-w-full h-auto align-middle border-none undefined"
                              />
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                              <img
                                alt="..."
                                src="https://demos.creative-tim.com/material-tailwind-dashboard-react/static/media/team-4-470x470.4ef82ef4.png"
                                className="rounded-full  max-w-full h-auto align-middle border-none undefined"
                              />
                            </div>
                          </div>
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
                      <tr>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          React Material Dashboard
                        </th>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          $4,400 USD
                        </th>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          <i className="fas fa-circle fa-sm text-teal-500 mr-2" />{' '}
                          on schedule
                        </th>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          <div className="flex">
                            <div className="w-10 h-10 rounded-full border-2 border-white">
                              <img
                                alt="..."
                                src="https://demos.creative-tim.com/material-tailwind-dashboard-react/static/media/team-1-800x800.fa5a7ac2.jpg"
                                className="rounded-full  max-w-full h-auto align-middle border-none undefined"
                              />
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                              <img
                                alt="..."
                                src="https://demos.creative-tim.com/material-tailwind-dashboard-react/static/media/team-2-800x800.3e08ef14.jpg"
                                className="rounded-full  max-w-full h-auto align-middle border-none undefined"
                              />
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                              <img
                                alt="..."
                                src="https://demos.creative-tim.com/material-tailwind-dashboard-react/static/media/team-3-800x800.19201574.jpg"
                                className="rounded-full  max-w-full h-auto align-middle border-none undefined"
                              />
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                              <img
                                alt="..."
                                src="https://demos.creative-tim.com/material-tailwind-dashboard-react/static/media/team-4-470x470.4ef82ef4.png"
                                className="rounded-full  max-w-full h-auto align-middle border-none undefined"
                              />
                            </div>
                          </div>
                        </th>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          <div className="overflow-hidden h-2 flex rounded bg-teal-200">
                            <div
                              className="flex justify-center items-center rounded text-xs font-medium bg-teal-500 text-white"
                              style={{ width: '90%' }}
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
                          <i className="fas fa-circle fa-sm text-blue-gray-900 mr-2" />{' '}
                          completed
                        </th>
                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          <div className="flex">
                            <div className="w-10 h-10 rounded-full border-2 border-white">
                              <img
                                alt="..."
                                src="https://demos.creative-tim.com/material-tailwind-dashboard-react/static/media/team-1-800x800.fa5a7ac2.jpg"
                                className="rounded-full  max-w-full h-auto align-middle border-none undefined"
                              />
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                              <img
                                alt="..."
                                src="https://demos.creative-tim.com/material-tailwind-dashboard-react/static/media/team-2-800x800.3e08ef14.jpg"
                                className="rounded-full  max-w-full h-auto align-middle border-none undefined"
                              />
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                              <img
                                alt="..."
                                src="https://demos.creative-tim.com/material-tailwind-dashboard-react/static/media/team-3-800x800.19201574.jpg"
                                className="rounded-full  max-w-full h-auto align-middle border-none undefined"
                              />
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                              <img
                                alt="..."
                                src="https://demos.creative-tim.com/material-tailwind-dashboard-react/static/media/team-4-470x470.4ef82ef4.png"
                                className="rounded-full  max-w-full h-auto align-middle border-none undefined"
                              />
                            </div>
                          </div>
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
              href="https://www.creative-tim.com/presentation?ref=mtdk">
              Documentation
            </a>
          </li>
          <li className="mr-6">
            <a
              className="text-gray-700 hover:text-gray-900 font-medium block text-sm"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/creativetimofficial/material-tailwind-dashboard-react/blob/main/LICENSE?ref=mtdk">
              MIT License
            </a>
          </li>
          <li>
            <a
              className="text-gray-700 hover:text-gray-900 font-medium block text-sm"
              target="_blank"
              rel="noreferrer"
              href="https://creative-tim.com/contact-us?ref=mtdk">
              Github
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Start;
