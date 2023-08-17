import React from 'react';

export function Grid({children, columns}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 0.5fr)`,
        gridGap: 4,
        padding: 10,
        width:"60%",
        margin: "auto"
      }}
    >
      {children}
    </div>
  );
}
