import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import buttonStyles from 'components/ui/Button/Button.module.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type ButtonStyle = 'primary' | 'danger' | 'info' | 'success';

interface ButtonData {
  buttonType?: 'reset' | 'submit' | 'button';
  isSubmitting?: boolean;
  title?: string;
  onClickHandler?: (event: any) => void;
  buttonStyle?: ButtonStyle;
  link?: string;
  icon?: IconProp;
}

const ButtonLinkWrapper = ({ link, children }: any) => {
  return link ? <Link to={link}>{children}</Link> : children;
};

const Button = ({
  isSubmitting = false,
  title,
  onClickHandler,
  link,
  icon,
  buttonStyle = 'primary',
  buttonType = 'submit',
}: ButtonData) => {
  return (
    <ButtonLinkWrapper link={link}>
      <button
        className={classNames(buttonStyles.main, {
          [buttonStyles.primary]: buttonStyle === 'primary',
          [buttonStyles.danger]: buttonStyle === 'danger',
          [buttonStyles.success]: buttonStyle === 'success',
        })}
        disabled={isSubmitting}
        type={buttonType}
        {...(onClickHandler ? { onClick: onClickHandler } : {})}>
        <div className="flex justify-center">
          {title && <span className={buttonStyles.title}>{title}</span>}
          {icon && <FontAwesomeIcon icon={icon} />}
        </div>
      </button>
    </ButtonLinkWrapper>
  );
};

export default Button;
