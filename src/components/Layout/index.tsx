import React from 'react';
import classNames from 'classnames';
import './index.less';

export interface LayoutProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children, style } = props;
  const classes = classNames('layout');
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};

export default Layout;
