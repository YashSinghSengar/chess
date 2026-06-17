import React from 'react';

interface PieceProps {
  color: 'w' | 'b';
  className?: string;
}

const PieceWrapper: React.FC<{ children: React.ReactNode; color: 'w' | 'b'; className?: string }> = ({ children, color, className }) => (
  <div className={`piece ${color === 'w' ? 'white' : 'black'} ${className || ''}`}>
    <svg viewBox="0 0 45 45" width="100%" height="100%">
      {children}
    </svg>
  </div>
);

export const King: React.FC<PieceProps> = ({ color, className }) => (
  <PieceWrapper color={color} className={className}>
    <g fill="none" fillRule="evenodd" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.5 11.63V6M20 8h5" strokeLinejoin="miter" />
      <path d="M22.5 25s4.5-7.5 4.5-11.25c0-2.5-2-4.5-4.5-4.5s-4.5 2-4.5 4.5c0 3.75 4.5 11.25 4.5 11.25z" fill="currentColor" fillOpacity={color === 'w' ? 0.2 : 0.4} />
      <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-1-4-1-4s-3.5-3.5-6-3.5-6 3.5-6 3.5c-2 2 2 2 0 4s-5-3-5-3-3-2-5-2-5 2-5 2-1 1-1 1c-3 0-6 3.5-6 3.5s3 3 1 4c-3 6 6 10.5 6 10.5v7z" fill="currentColor" fillOpacity={color === 'w' ? 0.2 : 0.4} />
      <path d="M11.5 30c5.5 3 15.5 3 21 0m-21 3.5c5.5 3 15.5 3 21 0m-21 3.5c5.5 3 15.5 3 21 0" />
    </g>
  </PieceWrapper>
);

export const Queen: React.FC<PieceProps> = ({ color, className }) => (
  <PieceWrapper color={color} className={className}>
    <g fill="none" fillRule="evenodd" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM11 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM38 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" fill="currentColor" fillOpacity={color === 'w' ? 0.2 : 0.4} />
      <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-5.5-13.5V25L13 14l2 12z" fill="currentColor" fillOpacity={color === 'w' ? 0.2 : 0.4} />
      <path d="M9 26c0 2 1.5 2 2.5 4 1 2.5 2 1 2 1s1.5 2.5 3 2.5 3-2.5 3-2.5 1.5 1.5 3 1.5 3-1.5 3-1.5 1.5 2.5 3 2.5 3-2.5 3-2.5 1 1.5 2 1 2.5-1.5 1-4c1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" fill="currentColor" fillOpacity={color === 'w' ? 0.2 : 0.4} />
      <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-1-4-1-4s-3.5-3.5-6-3.5-6 3.5-6 3.5c-2 2 2 2 0 4s-5-3-5-3-3-2-5-2-5 2-5 2-1 1-1 1c-3 0-6 3.5-6 3.5s3 3 1 4c-3 6 6 10.5 6 10.5v7z" style={{display: 'none'}} />
      <path d="M11 34.5c5.5 3 15.5 3 21 0" />
      <path d="M9 37c8.5 3 18.5 3 27 0" fill="currentColor" fillOpacity={color === 'w' ? 0.2 : 0.4} />
    </g>
  </PieceWrapper>
);

export const Rook: React.FC<PieceProps> = ({ color, className }) => (
  <PieceWrapper color={color} className={className}>
    <g fill="none" fillRule="evenodd" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" fill="currentColor" fillOpacity={color === 'w' ? 0.2 : 0.4} />
      <path d="M34 14l-3 3H14l-3-3" />
      <path d="M31 17v12.5H14V17" fill="currentColor" fillOpacity={color === 'w' ? 0.2 : 0.4} />
      <path d="M31 29.5l1.5 2.5h-20l1.5-2.5" />
      <path d="M11 14h23" />
    </g>
  </PieceWrapper>
);

export const Bishop: React.FC<PieceProps> = ({ color, className }) => (
  <PieceWrapper color={color} className={className}>
    <g fill="none" fillRule="evenodd" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <g fill="currentColor" fillOpacity={color === 'w' ? 0.2 : 0.4}>
        <path d="M9 36c3.39 1.09 12.61 1.09 16 0 0 0 3-1.5 3-2s-1.5-2.5-3-2.5c-3.39-1.09-12.61-1.09-16 0 0 0-3 1.5-3 2s1.5 2.5 3 2.5z" />
        <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" />
        <path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
      </g>
      <path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" strokeLinejoin="miter" />
    </g>
  </PieceWrapper>
);

export const Knight: React.FC<PieceProps> = ({ color, className }) => (
  <PieceWrapper color={color} className={className}>
    <g fill="none" fillRule="evenodd" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="currentColor" fillOpacity={color === 'w' ? 0.2 : 0.4} />
      <path d="M24 18c.38 2.43-1.09 5.38-4 5.38-3 0-4-3-4-3l-2.5 2.5-1.5-1.5s2.5-2.5 5-2.5c2 0 3.5 1.5 3 3.5" />
      <path d="M9.5 25.5A.5.5 0 1 1 9 25.5a.5.5 0 0 1 .5 0z" fill="currentColor" fillOpacity={color === 'w' ? 0.2 : 0.4} />
      <path d="M15 15.5c4.5 2 10 2 10-1s-2.5-4.5-5-4.5c-3 0-5 2-5 5.5" />
      <path d="M24 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" fill="currentColor" />
    </g>
  </PieceWrapper>
);

export const Pawn: React.FC<PieceProps> = ({ color, className }) => (
  <PieceWrapper color={color} className={className}>
    <g fill="none" fillRule="evenodd" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 39c5.5 3.5 15.5 3.5 21 0v-2.5H12V39z" fill="currentColor" fillOpacity={color === 'w' ? 0.2 : 0.4} />
      <path d="M12 36.5c5.5 2 15.5 2 21 0v-2.5H12v2.5z" fill="currentColor" fillOpacity={color === 'w' ? 0.2 : 0.4} />
      <path d="M15 34V24s-3.5-3-3.5-8c0-3.5 4.5-8 11-8s11 4.5 11 8c0 5-3.5 8-3.5 8v10" fill="currentColor" fillOpacity={color === 'w' ? 0.2 : 0.4} />
      <path d="M15 24c5.5 1.5 10.5 1.5 16 0M18 15h9m-10 4h11" />
    </g>
  </PieceWrapper>
);

export const Piece: React.FC<{ type: string; color: 'w' | 'b'; className?: string }> = ({ type, color, className }) => {
  switch (type.toLowerCase()) {
    case 'k': return <King color={color} className={className} />;
    case 'q': return <Queen color={color} className={className} />;
    case 'r': return <Rook color={color} className={className} />;
    case 'b': return <Bishop color={color} className={className} />;
    case 'n': return <Knight color={color} className={className} />;
    case 'p': return <Pawn color={color} className={className} />;
    default: return null;
  }
};
