/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import RcTooltip, { TooltipPlacement, PopoverProps } from '@/components/Popover';

import './styles/index.less';

const Tooltip: React.FC<PopoverProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <RcTooltip prefixCls="tooltip" transitionName="tooltip-fade" {...rest}>
      {children}
    </RcTooltip>
  );
};

Tooltip.displayName = 'Tooltip';
Tooltip.defaultProps = {
  placement: 'top' as TooltipPlacement,
  trigger: 'hover',
};

export default Tooltip;
