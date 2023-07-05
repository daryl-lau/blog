import React from 'react';
import classNames from 'classnames';
import './index.less';

export interface SVGIconProps {
  className?: string;
  name: string;
  width?: number;
  height?: number;
  color?: string;
  fontSize?: number;
  style?: React.CSSProperties;
}

const SvgIcon: React.FC<SVGIconProps> = (props) => {
  const { className, name, width, height, color, fontSize, style } = props;
  const classes = classNames('icon', className);
  // 直接写在style上的属性比自定义的属性优先级高，以style中的为准
  const styles = {
    width: `${width}px`,
    height: `${height}px`,
    fontSize: `${fontSize}px`,
    color,
    ...style,
  };
  return (
    <svg className={classes} aria-hidden="true" style={styles}>
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  );
};

export default SvgIcon;
