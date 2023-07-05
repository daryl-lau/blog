import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import Popover from "@/components/Popover";
import SvgIcon from "@/components/SvgIcon";
import { v4 as uuidv4 } from "uuid";
import "./index.less";

export interface ProfileProps {
  className?: string;
}

const Profile: React.FC<ProfileProps> = (props): React.ReactElement => {
  const history = useHistory();
  const [popoverVisible, setpopoverVisible] = useState<boolean>(false);
  const { className } = props;
  const classNames = classnames(className);
  const hidePopover = () => {
    setpopoverVisible(false);
  };
  const settingClick = () => {
    history.push("/setting");
    hidePopover();
  };
  const writeClick = () => {
    window.open(`/writing/${uuidv4()}`);
    hidePopover();
  };
  const loginClick = () => {
    window.open("/login");
  };
  const handleVisibleChange = (visible: boolean) => {
    setpopoverVisible(visible);
  };

  const profileContent = (
    <div className="profile-popover">
      <ul>
        <li onClick={settingClick}>
          <SvgIcon name="user-alt" />
          设置
        </li>
        <li onClick={writeClick}>
          <SvgIcon name="pen-nib1" />
          写文章
        </li>
        <li onClick={loginClick}>
          <SvgIcon name="cog3" />
          登录
        </li>
      </ul>
    </div>
  );

  return (
    <Popover
      content={profileContent}
      transitionName="popover-fade"
      placement="bottom"
      trigger="hover"
      visible={popoverVisible}
      onVisibleChange={handleVisibleChange}
      overlayClassName="profile-popover-wrap"
    >
      <button type="button" className={classNames}>
        <img src="https://qncdn-open.baihuzi.com/ace3.jpg" alt="" />
      </button>
    </Popover>
  );
};

export default Profile;
