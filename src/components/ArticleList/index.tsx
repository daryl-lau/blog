import React, { useState, useCallback } from "react";
import "./index.less";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import { Transition, TransitionGroup } from "react-transition-group";
import ArticleCard from "@/components/ArticleCard";
import SvgIcon from "@/components/SvgIcon";

export interface ArticleListProps {
  mode: "vertical" | "horizontal";
  data: Array<ArticleDataProps>;
  onLoad?: () => Promise<void>;
  startIndex?: number;
  showLoad?: boolean;
  showLoadMore?: boolean;
}

export interface ArticleDataProps {
  id: string;
  title: string;
  cover: string;
  abstract: string;
  reading: number;
  support: number;
  updatetime: string;
}

const ArticleList: React.FC<ArticleListProps> = (props) => {
  const { mode, data, onLoad, startIndex = 0, showLoad, showLoadMore } = props;
  const history = useHistory();
  const [isLoading, setLoading] = useState<boolean>(false);

  const loadMore = useCallback(() => {
    if (isLoading) return;
    if (onLoad && onLoad instanceof Function) {
      setLoading(true);
      onLoad().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading, onLoad]);

  const classes = classnames({ w25: mode === "vertical" });
  const articleListClasses = classnames({
    "vertical-list": mode === "vertical",
    "horizontal-list": mode === "horizontal",
  });

  const defaultStyle =
    mode === "vertical"
      ? {
          transition: `transform ${700}ms ease-in-out,opacity ${800}ms ease-in-out`,
          transform: "translate(0px, 200px)",
          opacity: 0,
        }
      : { transition: `opacity ${400}ms ease-in-out`, opacity: 0 };

  const transitionStyles =
    mode === "vertical"
      ? {
          entering: { transform: "translate(0px, 200px)", opacity: 0 },
          entered: { transform: "translate(0px, 0px)", opacity: 1 },
          exiting: { opacity: 1 },
          exited: { opacity: 0 },
          unmounted: { opacity: 0 },
        }
      : {
          entering: { opacity: 0 },
          entered: { opacity: 1 },
          exiting: { opacity: 1 },
          exited: { opacity: 0 },
          unmounted: { opacity: 0 },
        };
  const render = () => {
    return (
      <div>
        <TransitionGroup className={articleListClasses}>
          {data.map((item, i) => {
            let delayStyle = {
              transitionDelay: "",
            };
            if (i > startIndex) {
              delayStyle.transitionDelay = `${(i - startIndex) * 100}ms`;
            }
            return (
              <Transition key={item.id} classNames="article" timeout={0} appear>
                {(state) => (
                  <ArticleCard
                    style={{
                      ...defaultStyle,
                      ...transitionStyles[state],
                      ...delayStyle,
                    }}
                    className={classes}
                    key={item.id}
                    title={item.title}
                    cover={item.cover}
                    mode={mode}
                    date={item.updatetime}
                    reading={item.reading}
                    support={item.support}
                    onClick={() => {
                      history.push(`/article/${item.id}`);
                    }}
                  >
                    {item.abstract}
                  </ArticleCard>
                )}
              </Transition>
            );
          })}
        </TransitionGroup>
        {showLoadMore ? (
          onLoad && onLoad instanceof Function && showLoad ? (
            <div className="load-more" onClick={loadMore}>
              {isLoading ? (
                "正在加载..."
              ) : (
                <span>
                  加载更多
                  <SvgIcon name="angle-double-down" />
                </span>
              )}
            </div>
          ) : (
            <>
              <div className="noMore">
                <span>暂无更多文章</span>
              </div>
            </>
          )
        ) : null}
      </div>
    );
  };
  return <>{render()}</>;
};

export default ArticleList;
