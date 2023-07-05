import React, { cloneElement } from "react";
import { Item, MenuItemProps as RcMenuItemProps } from "rc-menu";
import utils from "../../utils";

export interface MenuItemProps extends Omit<RcMenuItemProps, "itemIcon"> {
  icon?: React.ReactElement | null;
  rootPrefixCls?: string;
}

const MenuItem: React.FC<MenuItemProps> & { isMenuItem: boolean } = (props) => {
  const { children, rootPrefixCls, ...rest } = props;
  let { icon } = props;
  icon = icon
    ? cloneElement(icon, { className: `${rootPrefixCls}-item-icon` })
    : null;
  return (
    <Item {...utils.omit(rest, ["icon"])} rootPrefixCls={rootPrefixCls}>
      {icon}
      {children}
    </Item>
  );
};

MenuItem.isMenuItem = true;

export default MenuItem;
