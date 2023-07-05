import React from 'react';
import './index.less';

export interface MainProps {
  children?: React.ReactElement | React.ReactElement[];
}

const Main: React.FC<MainProps> = (props) => {
  const { children } = props;
  const childrenCount = React.Children.count(children);
  if (childrenCount > 2) {
    throw new Error('Main子组件不能超过2个');
  }

  return childrenCount === 2 ? (
    <main className="app-main">
      <div className="main-content">
        <div className="main-left">{React.Children.toArray(children)[0]}</div>
        <div className="main-right">{React.Children.toArray(children)[1]}</div>
      </div>
    </main>
  ) : (
    <main className="app-main">
      <div className="main-content">{children}</div>
    </main>
  );
};

export default Main;
