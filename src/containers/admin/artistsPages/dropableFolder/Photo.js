import React, { forwardRef } from "react";

export const Photo = forwardRef(
  ({ url, index, faded, style, ...props }, ref) => {
    const inlineStyles = {
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      height: "5vw",
      width:"5vw",
      gridRowStart: null,
      gridColumnStart: null,
      backgroundImage: `url("${url}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "grey",
      ...style
    };

    return <div ref={ref} style={inlineStyles} {...props} />;
  }
);
