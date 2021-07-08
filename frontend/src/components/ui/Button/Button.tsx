import classNames from 'classnames';
import React from 'react';
import Processing from 'components/ui/Processing/Processing';

import buttonStyles from 'components/ui/Button/Button.module.scss';

type ButtonStyle = 'primary' | 'danger' | 'info' | 'success';

interface ButtonData {
  isSubmitting?: boolean;
  title: string;
  onClickHandler?: () => void;
  buttonStyle?: ButtonStyle;
}

const Button = ({
  isSubmitting = false,
  title,
  onClickHandler,
  buttonStyle = 'primary',
}: ButtonData) => {
  return (
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
        <span>{title}</span>
      </div>
    </button>
  );
};

export default Button;
