import React from 'react';
import './index.less';

export interface NavTitleProps {
  children: string;
}

const NavTitle: React.FC<NavTitleProps> = (props): React.ReactElement => {
  const { children } = props;
  return <div className="nav-title">{children}</div>;
};

export default NavTitle;
