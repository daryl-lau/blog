import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useLocation, useHistory } from "react-router-dom";
import Menu, { MenuItem } from "@/components/Menu";
import Search from "@/components/Search";
// import Profile from "@/components/Profile";
import "./index.less";
import utils from "@/utils";

export interface HeaderProps {
  children?: React.ReactNode;
}

const nav = [
  { key: "/home", name: "主页" },
  { key: "/category", name: "分类" },
  // { key: '/about', name: '关于' },
];

const Header: React.FC<HeaderProps> = () => {
  const [selectedKey, setSelectedKey] = useState<string[]>([]);
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedKey(["/home"]);
    } else {
      setSelectedKey([`/${location.pathname.split("/")[1]}`]);
    }
  }, [location.pathname]);
  const classes = classNames("header");
  const renderNav = () => {
    return nav.map((item) => {
      let path = "";
      if (item.key === "/home") {
        path = "/";
      } else if (item.key === "/category") {
        const historyPath = utils.getStorage<{ key: string }>(
          "local",
          "historyPath"
        );
        if (historyPath) {
          const { key } = historyPath;
          path = `/category/${key}`;
        } else {
          path = "/category/all";
        }
      } else {
        path = item.key;
      }
      return (
        <MenuItem
          key={item.key}
          onClick={() => {
            history.push(path);
          }}
        >
          {item.name}
        </MenuItem>
      );
    });
  };
  return (
    <header>
      <div className="placeholder" />
      <div className={classes}>
        <div className="header-inner">
          {/* <Logo /> */}
          <Menu
            mode="horizontal"
            selectedKeys={selectedKey}
            className="header-navbar"
          >
            {renderNav()}
          </Menu>
          <div className="header-right">
            <Search />
            {/* <Profile className="profile" /> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
