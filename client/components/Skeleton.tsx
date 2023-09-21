import React from "react";

interface IProps {
  width?: number;
  height?: number;
  className?: string;
}

const Skeleton = ({ width, height, className }: IProps) => {
  return (
    <div
      style={{ width: width && `${width}px`, height: height && `${height}px` }}
      className={`bg-black bg-opacity-30 animate-pulse ${
        className && className
      }`}
    ></div>
  );
};

export default Skeleton;
