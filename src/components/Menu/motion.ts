import {
  CSSMotionProps,
  MotionEventHandler,
  MotionEndEventHandler,
} from "rc-motion";

// ================== Collapse Motion ==================
const getCollapsedHeight: MotionEventHandler = () => ({
  height: 0,
});
const getRealHeight: MotionEventHandler = (node) => ({
  height: node.scrollHeight,
});
const getCurrentHeight: MotionEventHandler = (node) => ({
  height: node.offsetHeight,
});
const skipOpacityTransition: MotionEndEventHandler = (_, event) =>
  (event as TransitionEvent).propertyName === "height";

const collapseMotion: CSSMotionProps = {
  motionName: "menu-open-collapse",
  onAppearStart: getCollapsedHeight,
  onEnterStart: getCollapsedHeight,
  onAppearActive: getRealHeight,
  onEnterActive: getRealHeight,
  onLeaveStart: getCurrentHeight,
  onLeaveActive: getCollapsedHeight,
  onAppearEnd: skipOpacityTransition,
  onEnterEnd: skipOpacityTransition,
  onLeaveEnd: skipOpacityTransition,
  motionDeadline: 500,
};

export default collapseMotion;
