import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Main from "@/components/Main";
import ArticleList, { ArticleDataProps } from "@/components/ArticleList";
import FilingInfo from "@/components/FilingInfo";
import Loading from "@/components/Loading";
import NavTitle from "@/components/NavTitle";
import { searchArticle } from "@/api";
import "@/assets/styles/common.less";
import "./index.less";

const Search: React.FC = () => {
  const [data, setData] = useState<Array<ArticleDataProps>>([]);
  const { state } = useLocation<any>();
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    let isMounted = true;
    setData([]);
    setLoading(true);
    const params = {
      keyword: state.keyword,
    };
    searchArticle(params).then((res: any) => {
      setLoading(false);
      if (isMounted) setData(res.articles);
    });
    return () => {
      isMounted = false;
    };
  }, [state.keyword]);

  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_TITLE}-搜索`;
  }, []);

  return (
    <>
      {/* <Banner /> */}
      <NavTitle>搜索结果</NavTitle>
      <Main>
        <div className="article-list">
          {data.length ? (
            <div className="article-list-content">
              {!isLoading ? (
                <ArticleList mode="vertical" data={data} showLoadMore={false} />
              ) : (
                <Loading />
              )}
            </div>
          ) : (
            <div className="noData">
              <span>没有适合条件的文章，</span>
              <span className="backToHome" onClick={() => history.push("/")}>
                回到首页
              </span>
            </div>
          )}
        </div>
      </Main>
      <FilingInfo />
    </>
  );
};

export default Search;
