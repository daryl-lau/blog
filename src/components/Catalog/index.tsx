import React, { useEffect } from "react";
import $ from "jquery";
import "./index.less";

export interface CatalogProps {
  style?: React.CSSProperties;
  toc?: string;
  setCurrnetLink: React.Dispatch<React.SetStateAction<string>>;
  currentLink: string;
  handleWindowScroll: any;
}

const Catalog: React.FC<CatalogProps> = (props) => {
  const {
    style,
    toc = "",
    setCurrnetLink,
    currentLink,
    handleWindowScroll,
  } = props;

  const setActive = (currentLink: HTMLElement, isLiTag: boolean) => {
    const currentLi = isLiTag ? $(currentLink) : $(currentLink).parent();
    currentLi.addClass("active");
  };

  useEffect(() => {
    if (!currentLink) return;
    $(".article-catalog ul li").removeClass("active");
    $(".article-catalog ul").removeClass("active");
    const liOffsetTop = $(`a[href="\#${currentLink}"]`)[0].offsetTop;
    const catalogHeight = $(".article-catalog").height() || 0;
    $(`.article-catalog`)
      .stop(true)
      .animate(
        { scrollTop: liOffsetTop - catalogHeight / 2 + "px" },
        200,
        "linear"
      );
    setActive($(`a[href="\#${currentLink}"]`)[0], false);
  }, [currentLink]);

  useEffect(() => {
    $(".article-catalog ul").on("click", (e) => {
      e.preventDefault();
      const id = e.target.getAttribute("href")?.slice(1) || "";
      setCurrnetLink(id);
      const offsetTop = $(`\#${id}`).offset()?.top || 0;
      $("html, body")
        .stop(true)
        .animate(
          {
            scrollTop: offsetTop - 70 + "px",
          },
          200,
          "linear"
        );
    });

    return () => {
      $(".article-catalog ul").off();
    };
  }, []);

  useEffect(() => {}, [currentLink]);

  return (
    <div
      className="article-catalog"
      style={style}
      onMouseEnter={() => {
        $(window).off("scroll");
      }}
      onMouseLeave={() => {
        $(window).on("scroll", handleWindowScroll);
      }}
      dangerouslySetInnerHTML={{ __html: toc }}
    />
  );
};

export default Catalog;
