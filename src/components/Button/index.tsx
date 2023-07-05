/* eslint-disable react/jsx-props-no-spreading */
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import './styles/index.less';

export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'default' | 'primary' | 'danger' | 'info' | 'link';

interface IButtonProps {
  btnType?: ButtonType;
  disable?: boolean;
  children?: React.ReactNode;
  size?: ButtonSize;
  href?: string;
}

type NativeButtonProps = IButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = IButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
  const { btnType, disable, children, size, href, className, ...rest } = props;
  const classes = classNames('btn', className, {
    [`btn-${size}`]: size,
    [`btn-${btnType}`]: btnType,
  });

  if (btnType === 'link') {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    // eslint-disable-next-line react/button-has-type
    <button disabled={disable} className={classes} {...rest}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  btnType: 'default',
};

export default Button;
