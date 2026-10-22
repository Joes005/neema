import React from "react";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

export default function Image({
  fill,
  priority,
  className = "",
  style,
  src,
  alt = "",
  ...props
}: ImageProps) {
  const fillStyle: React.CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style }
    : style || {};

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      className={`${fill ? "object-cover" : ""} ${className}`}
      style={fillStyle}
      {...props}
    />
  );
}
