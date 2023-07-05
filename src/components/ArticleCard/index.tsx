import React from "react";
import classnames from "classnames";
import moment from 'moment'
import "./index.less";

export interface articleCardProps {
  className?: string;
  style?: React.CSSProperties;
  title: string;
  mode?: "vertical" | "horizontal";
  cover?: string;
  children: string;
  date: string;
  reading: number;
  support: number;
  onClick?: React.MouseEventHandler;
}

const articleCard: React.FC<articleCardProps> = (props) => {
  const {
    title,
    mode,
    cover,
    children,
    date,
    onClick,
    className,
    style,
  } = props;
  const classNames = classnames(mode, "article", className);
  const render = () => {
    return (
      <div className={classNames} onClick={onClick} style={style}>
        <div className="article-cover">
          <div
            className="cover-image"
            style={{ backgroundImage: `url(${cover})` }}
          />
        </div>
        <div className="article-container">
          <div className="article-title">{title}</div>
          {mode === "horizontal" ? (
            <span className="article-date">
              更新日期：
              {moment(date).format('YYYY-MM-DD')}
            </span>
          ) : null}
          <p className="article-content">{children}</p>
          <div className="article-common">
            <div>
              <div
                className="article-reading"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {/* <SvgIcon name="eye" /> */}
              </div>
              <div
                className="article-support"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {/* <SvgIcon name="thumbs-up1" /> */}
              </div>
            </div>
            {mode === "vertical" ? (
              <span className="article-date">{moment(date).format('YYYY-MM-DD')}</span>
            ) : null}
          </div>
        </div>
      </div>
    );
  };
  return render();
};

articleCard.defaultProps = {
  mode: "horizontal",
};

export default articleCard;
