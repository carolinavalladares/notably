import React from "react";

interface IProps {
  image: string;
  width: string;
}

const Avatar = ({ image, width }: IProps) => {
  return (
    <div className={`relative`}>
      <div
        style={{ width: width, height: width }}
        className={` m-auto overflow-hidden rounded-full flex items-start justify-center border border-border-color bg-white p-1`}
      >
        <img
          className="w-3/4"
          src={`/images/avatars/${image}.webp`}
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default Avatar;
