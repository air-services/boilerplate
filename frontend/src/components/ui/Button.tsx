import classNames from 'classnames';
import React from 'react';
import ProcessingSpinner from './ProcessingSpinner';

import buttonStyles from './Button.module.scss';

interface ButtonData {
  isSubmitting: boolean;
  title: string;
  onClickHandler?: () => void;
}

const Button = ({ isSubmitting, title, onClickHandler }: ButtonData) => {
  return (
    <button
      className={classNames(buttonStyles.main, {
        [buttonStyles.notSubmittingHover]: !isSubmitting,
      })}
      disabled={isSubmitting}
      type="submit"
      {...(onClickHandler ? { onClick: onClickHandler } : {})}>
      <div className="flex justify-center">
        {isSubmitting && <ProcessingSpinner />}
        <span>{title}</span>
      </div>
    </button>
  );
};

export default Button;
