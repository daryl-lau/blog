import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import Trigger from "rc-trigger";
import SearchPopup from "./SearchPopup";
import SvgIcon from "@/components/SvgIcon";
import "./index.less";

const Search = (): React.ReactElement => {
  const history = useHistory();
  const [inputValue, setInputValue] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const hideSearchPopup = () => {
    inputRef.current?.blur();
  };

  const storeSearchHistory = (item: string) => {
    if (!searchHistory.includes(item)) {
      setSearchHistory((preSearchHistory: string[]) => {
        return [item, ...preSearchHistory].splice(0, 3);
      });
    }
  };

  useEffect(() => {
    const history = localStorage.getItem("searchHistory") || "[]";
    setSearchHistory(JSON.parse(history));
  }, []);

  const handleSearchClick = () => {
    if (inputValue.trim()) {
      storeSearchHistory(inputValue.trim());
      history.push({
        pathname: "/search",
        state: { keyword: inputValue.trim() },
      });
    } else {
      return;
    }
    hideSearchPopup();
  };

  const handleEnter = (e: { keyCode: any }) => {
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      handleSearchClick();
    }
  };

  const inputClassNames = classnames("search-input", { "is-focused": focused });

  const clearInputValue = () => {
    setInputValue("");
  };

  const renderSearchPopup = (
    <SearchPopup
      hideSearchPopup={hideSearchPopup}
      setInputValue={setInputValue}
      searchHistory={searchHistory}
      setSearchHistory={setSearchHistory}
      storeSearchHistory={storeSearchHistory}
    />
  );
  return (
    <div className="header-search">
      <Trigger
        popup={renderSearchPopup}
        popupVisible={popupVisible}
        popupTransitionName="search-popup-fade"
        action={["click"]}
        prefixCls="search-popup"
        popupAlign={{
          points: ["tl", "bl"],
          offset: [0, 4],
        }}
      >
        <div className="search-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            placeholder="输入想要搜索的内容..."
            className={inputClassNames}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => {
              setFocused(true);
              setPopupVisible(true);
            }}
            onBlur={() => {
              setFocused(false);
              setPopupVisible(false);
            }}
            onKeyDown={handleEnter}
          />
          {focused ? (
            <span
              className="clear-input"
              aria-hidden
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={clearInputValue}
            >
              <SvgIcon name="times-circle2" />
            </span>
          ) : null}
          <button
            className="search-button"
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onClick={handleSearchClick}
          >
            搜索
          </button>
        </div>
      </Trigger>
    </div>
  );
};

export default Search;
