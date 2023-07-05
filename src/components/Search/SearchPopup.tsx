import React, { useEffect } from "react";
import SvgIcon from "../SvgIcon";

export interface SearchPopupProps {
  hideSearchPopup: () => void;
  setInputValue: React.Dispatch<string>;
  searchHistory: string[];
  setSearchHistory: React.Dispatch<string[]>;
  storeSearchHistory: (param: string) => void;
}

const data = {
  hotSearch: ["Golang基础", "React顶层API"],
};

const SearchPopup: React.FC<SearchPopupProps> = (props): React.ReactElement => {
  const {
    hideSearchPopup,
    setInputValue,
    searchHistory,
    setSearchHistory,
    storeSearchHistory,
  } = props;

  useEffect(() => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, [setSearchHistory]); // 能引发组件re-render的内容，就能作为第二个参数数组的参数

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleClearClick = () => {
    setSearchHistory([]);
    localStorage.setItem("searchHistory", JSON.stringify([]));
  };

  const handleHistoryClick = (history: string) => {
    setInputValue(history);
    hideSearchPopup();
  };

  const handleHotClick = (hot: string) => {
    storeSearchHistory(hot);
    setInputValue(hot);
    hideSearchPopup();
  };

  const renderHotSearch = (d: { hotSearch: string[] }): React.ReactNode => {
    return d.hotSearch.map((item: string) => (
      <li
        key={item}
        onClick={() => {
          handleHotClick(item.trim());
        }}
      >
        {item.trim()}
      </li>
    ));
  };

  const renderSearchHistory = () => {
    if (searchHistory.length < 1) return null;
    return (
      <div className="search-history">
        <div className="search-history-title">
          <span>搜索历史</span>
          <span className="clear" onClick={handleClearClick}>
            清除
            <SvgIcon name="trash-alt2" style={{ marginLeft: "3px" }} />
          </span>
        </div>
        <ul className="search-list">
          {searchHistory.map((item) => (
            <li
              key={item}
              onClick={() => {
                handleHistoryClick(item.trim());
              }}
            >
              {item.trim()}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <div
      aria-hidden
      className="search-content"
      onMouseDown={(e) => {
        e.preventDefault();
      }}
    >
      {renderSearchHistory()}
      <div className="hot-search">
        <div className="hot-search-title">热门搜索</div>
        <ul className="search-list">{renderHotSearch(data)}</ul>
      </div>
    </div>
  );
};

export default SearchPopup;
