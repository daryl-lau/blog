import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import Main from "@/components/Main";
import ArticleList, { ArticleDataProps } from "@/components/ArticleList";
import FilingInfo from "@/components/FilingInfo";
import NavTitle from "@/components/NavTitle";
import CategoryMenu from "@/components/CategoryMenu";
import Sticky from "@/components/Sticky";
import Loading from "@/components/Loading";
import { getCategory } from "@/api";
import "./index.less";

const Article: React.FC = () => {
  const history = useHistory();
  const { category } = useParams<{ category: string }>();
  const [data, setData] = useState<Array<ArticleDataProps>>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showLoad, setShowLoad] = useState(false);
  const pageSize = 10;
  useEffect(() => {
    let isMounted = true;
    setPage(2);
    setData([]);
    setLoading(true);
    getCategory(category, page, pageSize).then((res: any) => {
      setLoading(false);
      if (isMounted) {
        setData(res.articles);
        if (res.articles.length < res.total) {
          setShowLoad(true);
        } else {
          setShowLoad(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [category]);

  const handleChange = (key: string) => {
    setPage(1);
    history.push(`/category/${key}`);
  };

  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_TITLE}-分类`;
  }, []);

  const loadMore = useCallback(() => {
    setPage((p) => p + 1);
    return new Promise<void>((resolve) => {
      getCategory(category, page, pageSize).then((res: any) => {
        setData((data) => {
          setStartIndex(data.length);
          if (res.articles.length + data.length < res.total) {
            setShowLoad(true);
          } else {
            setShowLoad(false);
          }
          return [...data, ...res.articles];
        });
        resolve();
      });
    });
  }, [category, page]);
  return (
    <>
      <NavTitle>技术文章</NavTitle>
      <Main>
        {!isLoading ? (
          <ArticleList
            data={data}
            startIndex={startIndex}
            mode="horizontal"
            onLoad={loadMore}
            showLoad={showLoad}
            showLoadMore={true}
          />
        ) : (
          <Loading />
        )}
        <Sticky offsetTop={72} stickyTop={52}>
          <CategoryMenu onChange={(key) => handleChange(key)} />
        </Sticky>
      </Main>
      <FilingInfo />
    </>
  );
};

export default Article;
