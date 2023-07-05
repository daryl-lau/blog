import React from "react";
import { SubMenu as RcSubMenu, SubMenuProps as RcSubMenuProps } from "rc-menu";

const SubMenu: React.FC<RcSubMenuProps> & { isSubMenu: boolean } = (props) => {
  const { children, rootPrefixCls, ...rest } = props;
  return (
    <RcSubMenu {...rest} rootPrefixCls={rootPrefixCls}>
      {children}
    </RcSubMenu>
  );
};

SubMenu.isSubMenu = true;

export default SubMenu;
