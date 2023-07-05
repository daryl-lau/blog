import React, { cloneElement } from "react";
import RcMenu, { MenuProps as RcMenuProps } from "rc-menu";
import SvgIcon from "../SvgIcon";
import collapseMotion from "./motion";

export interface MenuProps extends RcMenuProps {
  inlineIndent?: number; // 只在mode为inline时生效
  expandIcon?: React.ReactElement;
  SubMenu?: React.ReactElement;
  mode?: "vertical" | "inline" | "horizontal";
  openAnimation?: "zoom" | "slide-up";
}

const Menu: React.FC<MenuProps> = (props) => {
  const { expandIcon, children, mode, openAnimation, prefixCls, ...rest } =
    props;
  // const getOpenAnimation = () => {
  //   if (openAnimation) {
  //     return openAnimation;
  //   }
  //   if (mode === "horizontal") {
  //     return "slide-up";
  //   }
  //   if (mode === "inline") {
  //     return undefined;
  //   }
  //   return "zoom";
  // };
  const rootPrefixCls = prefixCls || "menu";
  const defaultMotions = {
    horizontal: { motionName: "slide-up" },
    inline: collapseMotion,
    other: { motionName: "slide-up" },
  };
  const cloneExpandIcon = (): any => {
    if (expandIcon) {
      return cloneElement(expandIcon, {
        className: `${rootPrefixCls}-submenu-arrow`,
      });
    }
    return (
      <SvgIcon
        name="angle-right"
        className={`${rootPrefixCls}-submenu-arrow`}
      />
    );
  };
  return (
    <RcMenu
      mode={mode}
      prefixCls={rootPrefixCls}
      // openAnimation={getOpenAnimation()}
      expandIcon={cloneExpandIcon}
      triggerSubMenuAction="click"
      defaultMotions={defaultMotions}
      {...rest}
    >
      {children}
    </RcMenu>
  );
};

Menu.defaultProps = {
  inlineIndent: 24,
};

export default Menu;
