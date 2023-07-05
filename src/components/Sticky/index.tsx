import React, { useEffect, useRef } from 'react';

export interface StickyProps {
  offsetTop: number;
  stickyTop: number;
  children: React.ReactNode;
}

const Sticky: React.FC<StickyProps> = (props) => {
  const { children, offsetTop, stickyTop } = props;
  const placeholderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (placeholderRef.current && contentRef.current) {
      const { top, width } = placeholderRef.current.getBoundingClientRect();
      if (top < offsetTop) {
        contentRef.current.style.position = 'fixed';
        contentRef.current.style.width = `${width}px`;
        contentRef.current.style.top = `${stickyTop}px`;
      } else {
        contentRef.current.style.position = '';
        contentRef.current.style.width = '';
        contentRef.current.style.top = '';
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  return (
    <div>
      <div ref={placeholderRef} />
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

Sticky.defaultProps = {
  offsetTop: 0,
  stickyTop: 0,
};

export default Sticky;
