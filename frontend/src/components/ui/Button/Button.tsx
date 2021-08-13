import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import Processing from 'components/ui/Processing/Processing';

import buttonStyles from 'components/ui/Button/Button.module.scss';

type ButtonStyle = 'primary' | 'danger' | 'info' | 'success';

interface ButtonData {
  isSubmitting?: boolean;
  title: string;
  onClickHandler?: (event: any) => void;
  buttonStyle?: ButtonStyle;
  link?: string;
}

const ButtonLinkWrapper = ({ link, children }: any) => {
  return link ? <Link to={link}>{children}</Link> : children;
};

const Button = ({
  isSubmitting = false,
  title,
  onClickHandler,
  link,
  buttonStyle = 'primary',
}: ButtonData) => {
  return (
    <ButtonLinkWrapper link={link}>
      <button
        className={classNames(buttonStyles.main, {
          [buttonStyles.notSubmittingHover]: !isSubmitting,
          [buttonStyles.primary]: buttonStyle === 'primary',
          [buttonStyles.danger]: buttonStyle === 'danger',
        })}
        disabled={isSubmitting}
        type="submit"
        {...(onClickHandler ? { onClick: onClickHandler } : {})}>
        <div className="flex justify-center">
          {isSubmitting && <Processing />}
          <span className={buttonStyles.title}>{title}</span>
        </div>
      </button>
    </ButtonLinkWrapper>
  );
};

export default Button;
