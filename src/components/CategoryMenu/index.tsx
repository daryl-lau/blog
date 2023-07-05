import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import utils from "@/utils";
import { queryCategory } from "@/api";
import "./index.less";
import Menu, {
  // MenuClickEventHandler,
  SubMenu,
  MenuItem,
  // MenuInfo,
} from "../Menu";
import SvgIcon from "../SvgIcon";

export interface CategoryMenuProps {
  children?: React.ReactElement;
  onChange?: (key: string) => void;
}

export interface MenuItemInterface {
  name: string;
  key: string;
  children?: Array<MenuItemInterface>;
}
export type MenuData = Array<MenuItemInterface>;

const CategoryMenu: React.FC<CategoryMenuProps> = ({ onChange }) => {
  const location = useLocation();
  const [menuData, setMenuData] = useState<MenuData>([]);
  const [selectKeys, setSelectKeys] = useState<any>();
  const [openKeys, setOpenKeys] = useState<any>();

  const getDefaultMenu = (type: string): string[] => {
    const { pathname } = location;
    let path = "";
    if (pathname.endsWith("/")) {
      path = pathname.substring(0, pathname.length - 1);
    } else {
      path = pathname;
    }
    const category = path.split("/").pop() as string;
    const keyPath = utils.getObjPath(menuData, category);
    if (keyPath) {
      const key = keyPath.pop() as string;
      utils.setStorage("local", "historyPath", { key, keyPath });
      if (type === "key") {
        return [key];
      }
      return keyPath;
    }
    return [];
  };

  const handleClick = (key: string) => {
    onChange && onChange(key);
  };

  useEffect(() => {
    queryCategory().then((res: { data: any; }) => {
      const { data } = res;
      const menu = JSON.parse(data);
      setMenuData(menu);
    });
  }, []);

  useEffect(() => {
    setSelectKeys(getDefaultMenu("key"));
    setOpenKeys(getDefaultMenu("openKeys"));
  }, [menuData]);

  const renderMenu = (menu: MenuData) => {
    return menu.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu title={`${item.name}`} key={item.key}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <MenuItem key={item.key} onClick={() => handleClick(item.key)}>
          {`${item.name}`}
        </MenuItem>
      );
    });
  };
  return (
    <div className="category-wrap">
      <div className="category-title">技术文章分类</div>
      <Menu
        mode="inline"
        prefixCls="menu"
        expandIcon={<SvgIcon name="angle-right" />}
        className="category-menu"
        selectedKeys={selectKeys}
        openKeys={openKeys}
        onClick={({ keyPath }) => {
          setSelectKeys(keyPath[0]);
        }}
        onOpenChange={(keys) => {
          setOpenKeys(keys);
        }}
      >
        {renderMenu(menuData)}
      </Menu>
    </div>
  );
};

export default CategoryMenu;
