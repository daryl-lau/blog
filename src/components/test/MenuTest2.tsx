/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Menu, { SubMenu, MenuItem } from 'rc-menu';
import 'rc-menu/assets/index.css';
import SvgIcon from '@/components/SvgIcon';

const titleRight = <span>sub menu</span>;
// const titleRight1 = <span>sub menu 1</span>;
const titleRight2 = <span>sub menu 2</span>;
const titleRight3 = <span>sub menu 3</span>;

const MenuTest2 = (): React.ReactElement => {
  return (
    <>
      <Menu mode="inline" style={{ width: '300px' }}>
        <SubMenu
          title={titleRight}
          key="1"
          itemIcon={<SvgIcon name="address-card" />}
        >
          <MenuItem key="1-1">0-1</MenuItem>
          <MenuItem key="1-2" itemIcon={<SvgIcon name="zhihu" />}>
            0-2
          </MenuItem>
        </SubMenu>
        <MenuItem>
          <a href="http://taobao.com">i do not need key</a>
        </MenuItem>
        <MenuItem key="3">outer</MenuItem>
        <SubMenu
          title={(
            <>
              <SvgIcon name="zhihu" />
              123
            </>
        )}
          key="4"
        >
          <MenuItem key="4-1">inner inner</MenuItem>
          <SubMenu key="4-2" title={titleRight2}>
            <MenuItem key="4-2-1">inn</MenuItem>
            <SubMenu title={titleRight3} key="4-2-2">
              <MenuItem key="4-2-2-1">inner inner</MenuItem>
              <MenuItem key="4-2-2-2">inner inner2</MenuItem>
            </SubMenu>
          </SubMenu>
        </SubMenu>
        <MenuItem disabled>disabled</MenuItem>
        <MenuItem key="4-3">outer3</MenuItem>
      </Menu>
      <h1>-----------------------</h1>
      <Menu mode="vertical" style={{ width: '300px' }}>
        <SubMenu
          title={titleRight}
          key="1"
          itemIcon={<SvgIcon name="address-card" />}
        >
          <MenuItem key="1-1">0-1</MenuItem>
          <MenuItem key="1-2" itemIcon={<SvgIcon name="zhihu" />}>
            0-2
          </MenuItem>
        </SubMenu>
        <MenuItem>
          <a href="http://taobao.com">i do not need key</a>
        </MenuItem>
        <MenuItem key="3">outer</MenuItem>
        <SubMenu
          title={(
            <>
              <SvgIcon name="zhihu" />
              123
            </>
        )}
          key="4"
        >
          <MenuItem key="4-1">inner inner</MenuItem>
          <SubMenu key="4-2" title={titleRight2}>
            <MenuItem key="4-2-1">inn</MenuItem>
            <SubMenu title={titleRight3} key="4-2-2">
              <MenuItem key="4-2-2-1">inner inner</MenuItem>
              <MenuItem key="4-2-2-2">inner inner2</MenuItem>
            </SubMenu>
          </SubMenu>
        </SubMenu>
        <MenuItem disabled>disabled</MenuItem>
        <MenuItem key="4-3">outer3</MenuItem>
      </Menu>
    </>
  );
};

export default MenuTest2;
