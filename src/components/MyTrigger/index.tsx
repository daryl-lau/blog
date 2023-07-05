import React, {
  HTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import './index.less';

export type TriggerPosition = 'top' | 'right' | 'bottom' | 'left';

export interface TriggerProps {
  children: React.ReactElement;
  popup: React.ReactElement;
  triggerType: 'click' | 'hover';
  position?: TriggerPosition;
}

export interface PortalProps {
  children?: React.ReactNode;
}
export interface PortalRef {
  getPopupRef: () => unknown;
}

const Portal = React.forwardRef<PortalRef, PortalProps>((props, ref) => {
  const { children } = props;
  const popupRef = useRef<HTMLElement>();
  popupRef.current = document.createElement('div');
  popupRef.current.style.position = 'absolute';
  popupRef.current.style.left = '0';
  popupRef.current.style.top = '0';
  popupRef.current.style.width = '100%';
  useImperativeHandle(ref, () => ({
    getPopupRef: () => popupRef.current,
  }));
  useEffect(() => {
    document.body.appendChild(popupRef.current as HTMLElement);
    return () => {
      document.body.removeChild(popupRef.current as HTMLElement);
    };
  });
  return ReactDOM.createPortal(children, popupRef.current);
});

const Trigger: React.FC<TriggerProps> = (props) => {
  const { children, popup, triggerType } = props;
  const [popupVisiable, setPopupVisiable] = useState<boolean>(false);
  const triggerRef = useRef<React.ReactInstance>();
  const portalRef = useRef<PortalRef>(null);

  useEffect(() => {
  });
  // trigger event
  const click = () => {
    setPopupVisiable(!popupVisiable);
  };

  const mouseEnter = () => {
    setPopupVisiable(true);
  };
  const mouseLeave = () => {
    setPopupVisiable(false);
  };

  const constructNewChildProps = () => {
    const newChildProps: HTMLAttributes<HTMLElement> = {};
    if (triggerType === 'click') {
      newChildProps.onClick = click;
    }
    if (triggerType === 'hover') {
      newChildProps.onMouseEnter = mouseEnter;
      newChildProps.onMouseLeave = mouseLeave;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cloneProps: any = {
      ...newChildProps,
    };
    cloneProps.ref = triggerRef;
    return cloneProps;
  };

  const cloneChildren = () => {
    return React.cloneElement(
      React.Children.only(children),
      constructNewChildProps(),
    );
  };

  const portal = popupVisiable ? (
    <Portal ref={portalRef}>{popup}</Portal>
  ) : null;
  const clickHandle = () => {
  };
  return (
    <div>
      {cloneChildren()}
      {portal}
      <button onClick={clickHandle} type="button">
        点击
      </button>
    </div>
  );
};
Trigger.defaultProps = {
  triggerType: 'hover',
  position: 'bottom',
};
export default Trigger;
