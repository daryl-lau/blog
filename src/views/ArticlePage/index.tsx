import React, { useEffect, useState } from "react";
import Article from "@/components/Article";
import Catalog from "@/components/Catalog";
import Main from "@/components/Main";
import Sticky from "@/components/Sticky";
import "./index.less";
import Loading from "@/components/Loading";
import throttle from "lodash/throttle";
import { useParams } from "react-router-dom";
import { getArticleById } from "@/api";

const ArticlePage: React.FC = () => {
  const params: any = useParams();
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [toc, setToc] = useState("");
  const [title, setTitle] = useState("");
  const [currentLink, setCurrnetLink] = useState<string>("");

  const fetchArticle = () => {
    setLoading(true);
    getArticleById(params.articleId)
      .then((data: any) => {
        const { markdown, toc, title } = data;
        setValue(markdown || "");
        setToc(toc || "");
        setTitle(title);
        setLoading(false);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchArticle();
  }, []);

  const handleWindowScroll = throttle(() => {
    let list: any = [];
    Array.from(
      document.querySelectorAll("h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]")
    ).forEach((ele) => {
      const top = ele.getBoundingClientRect().top;
      if (top < 100) {
        list.push(ele);
      }
      setCurrnetLink(list[list.length - 1].getAttribute("id"));
    });
  }, 300);

  // useEffect(() => {
  //   const first = Array.from(
  //     document.querySelectorAll("h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]")
  //   )[0];
  //   console.log(first);
  //   if (!first) return;
  //   setCurrnetLink(first.getAttribute("id") || "");
  //   $(window).on("scroll", handleWindowScroll);
  // }, [value]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return isLoading ? (
    <Loading></Loading>
  ) : (
    <>
      <Main>
        <Article
          content={value}
          setCurrnetLink={setCurrnetLink}
          handleWindowScroll={handleWindowScroll}
        />
        <Sticky offsetTop={102} stickyTop={52}>
          <Catalog
            toc={toc}
            currentLink={currentLink}
            setCurrnetLink={setCurrnetLink}
            handleWindowScroll={handleWindowScroll}
          />
        </Sticky>
      </Main>
    </>
  );
};

export default ArticlePage;
