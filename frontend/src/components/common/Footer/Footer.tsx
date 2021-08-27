import React from 'react';

const Footer = () => {
  return (
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
  );
};

export default Footer;
