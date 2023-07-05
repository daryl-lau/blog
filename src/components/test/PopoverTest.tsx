import React from 'react';
import Popover from '@/components/Popover';

const PrivateLetter: React.FC = () => {
  const renderPopup = () => {
    return (
      <div>
        <p>PrivateLetterPrivateLetterPrivateLetter</p>
        <p>PrivateLetterPrivateLetterPrivateLetter</p>
        <p>PrivateLetterPrivateLetterPrivateLetter</p>
        <p>PrivateLetterPrivateLetterPrivateLetter</p>
        <p>PrivateLetterPrivateLetterPrivateLetter</p>
        <p>PrivateLetterPrivateLetterPrivateLetter</p>
        <p>PrivateLetterPrivateLetterPrivateLetter</p>
        <p>PrivateLetterPrivateLetterPrivateLetter</p>
        <p>PrivateLetterPrivateLetterPrivateLetter</p>
        <p>PrivateLetterPrivateLetterPrivateLetter</p>
        <p>PrivateLetterPrivateLetterPrivateLetter</p>
        <p>PrivateLetterPrivateLetterPrivateLetter</p>
        <p>PrivateLetterPrivateLetterPrivateLetter</p>
        <p>PrivateLetterPrivateLetterPrivateLetter</p>
        <p>PrivateLetterPrivateLetterPrivateLetter</p>
        <p>PrivateLetterPrivateLetterPrivateLetter</p>
        <p>PrivateLetterPrivateLetterPrivateLetter</p>
        <p>PrivateLetterPrivateLetterPrivateLetter</p>
      </div>
    );
  };
  return (
    <Popover
      content={renderPopup}
      placement="bottom"
      trigger="click"
      transitionName="popover-fade"
      arrowPointAtCenter
    >
      <div style={{ width: '80px', display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ width: '50%', backgroundColor: 'red' }}>1</div>
        <div style={{ width: '50%', backgroundColor: 'green' }}>2</div>
        <div style={{ width: '50%', backgroundColor: 'green' }}>3</div>
        <div style={{ width: '50%', backgroundColor: 'red' }}>4</div>
      </div>
    </Popover>
  );
};

export default PrivateLetter;
