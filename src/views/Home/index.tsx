import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "@/assets/styles/common.less";
import Main from "@/components/Main";
import ArticleList, { ArticleDataProps } from "@/components/ArticleList";
import FilingInfo from "@/components/FilingInfo";
import Loading from "@/components/Loading";
import { getCategory } from "@/api";

const Home: React.FC = () => {
  const [data, setData] = useState<Array<ArticleDataProps>>([]);
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    let isMounted = true;
    setData([]);
    setLoading(true);
    getCategory("all", 1, 16).then((res: any) => {
      setLoading(false);
      if (isMounted) setData(res.articles);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_TITLE}-首页`;
  }, []);
  return (
    <>
      {/* <Banner /> */}
      <Main>
        <div className="article-list">
          <div className="article-list-title">
            {/* <span>技术文章</span> */}
          </div>
          <div className="article-list-content">
            {!isLoading ? (
              <ArticleList mode="vertical" data={data} showLoadMore={false} />
            ) : (
              <Loading />
            )}
          </div>
          {data.length > 0 && (
            <div className="article-card-readmore">
              <span
                onClick={() => {
                  history.push("/category/all", { fromPath: "/" });
                }}
              >
                阅读所有文章
              </span>
            </div>
          )}
        </div>
      </Main>
      <FilingInfo />
    </>
  );
};

export default Home;
