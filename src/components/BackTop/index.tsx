import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import SvgIcon from "@/components/SvgIcon";
import { Tooltip } from "antd";
import useThrottle from "@/hooks/useThrottle";
import $ from "jquery";
import "./index.less";

export interface BackTopProps {
  visibilityHeight?: number;
}

const BackTop: React.FC<BackTopProps> = (props) => {
  const { visibilityHeight = 400 } = props;
  const [isVisiable, setVisiable] = useState(false);
  const handleScroll = useThrottle(() => {
    const top = window.pageYOffset;
    if (top >= visibilityHeight) {
      setVisiable(true);
    } else {
      setVisiable(false);
    }
  }, 300);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll as never);
    return () => {
      window.removeEventListener("scroll", handleScroll as never);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    $("html, body").stop().animate({
      scrollTop: 0,
    });
  };
  return (
    <CSSTransition in={isVisiable} timeout={100} classNames="fade">
      <div className="back-top">
        <Tooltip
          title={<span style={{ lineHeight: "18px" }}>回到顶部</span>}
          placement="left"
          overlayStyle={{ position: "fixed" }}
        >
          <div onClick={scrollToTop}>
            <SvgIcon
              name="arrow-alt-square-up"
              style={{ width: "40px", height: "40px" }}
            />
          </div>
        </Tooltip>
      </div>
    </CSSTransition>
  );
};
BackTop.defaultProps = {
  visibilityHeight: 400,
};
export default BackTop;
