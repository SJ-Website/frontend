import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX - 8}px, ${mouseY - 8}px, 0)`;
    };

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.transform = `translate3d(${followerX - 20}px, ${followerY - 20}px, 0)`;
      requestAnimationFrame(animateFollower);
    };

    document.addEventListener('mousemove', moveCursor);
    animateFollower();

    // Hide cursor on mouse leave
    const hideCursor = () => {
      cursor.style.opacity = '0';
      follower.style.opacity = '0';
    };
    const showCursor = () => {
      cursor.style.opacity = '1';
      follower.style.opacity = '1';
    };
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', showCursor);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', hideCursor);
      document.removeEventListener('mouseenter', showCursor);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: '#222',
          boxShadow: '0 0 8px 2px #efb100',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'background 0.2s, box-shadow 0.2s',
        }}
      />
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '2px solid #efb100',
          background: 'rgba(0,0,0,0.05)',
          boxShadow: '0 0 16px 2px #efb100',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
        }}
      />
    </>
  );
};

export default CustomCursor;
