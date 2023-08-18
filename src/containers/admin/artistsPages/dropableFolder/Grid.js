import React from 'react';

export function Grid({children, columns}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 5vw)`,
        gridGap: 4,
        padding: 10,
        width:"50%",
        margin: "auto"
      }}
    >
      {children}
    </div>
  );
}
