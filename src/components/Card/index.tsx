import React from 'react';
import classnames from 'classnames';
import './index.less';

export interface CardProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  hoverable?: boolean;
  className?: string;
  title?: React.ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  const { style, hoverable, className, title, children } = props;
  const classNames = classnames('card', className, {
    'card-hoverable': hoverable,
  });
  const renderCardTitle = () => {
    if (title) {
      return <div className="card-title">{title}</div>;
    }
    return null;
  };
  const renderCardBody = () => {
    if (children) {
      return <div className="card-body">{children}</div>;
    }
    return null;
  };
  return (
    <div style={style} className={classNames}>
      {renderCardTitle()}
      {renderCardBody()}
    </div>
  );
};

export default Card;
