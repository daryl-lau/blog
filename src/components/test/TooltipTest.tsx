import React from 'react';
import Tooltip from '@/components/Tooltip';

const TooltipTest: React.FC = () => {
  const renderPopup = () => {
    return (
      <div>
        PrivateLetterPrivateLetterPrivateLetterPrivateLetterPrivateLetterPrivateLetter
      </div>
    );
  };
  return (
    <Tooltip placement="topLeft" content={renderPopup} arrowPointAtCenter>
      <div style={{ width: '80px', display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ width: '50%', backgroundColor: 'red' }}>1</div>
        <div style={{ width: '50%', backgroundColor: 'green' }}>2</div>
        <div style={{ width: '50%', backgroundColor: 'green' }}>3</div>
        <div style={{ width: '50%', backgroundColor: 'red' }}>4</div>
      </div>
    </Tooltip>
  );
};

export default TooltipTest;
