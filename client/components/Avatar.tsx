import React from "react";

const Avatar = ({ image }: { image: string }) => {
  return (
    <div className="w-[70px] relative">
      <div className=" w-[60px] h-[60px]  m-auto overflow-hidden rounded-full flex items-start justify-center border border-border-color bg-white p-1">
        <img className="w-3/4" src={`/images/avatars/${image}.webp`} alt="" />
      </div>
    </div>
  );
};

export default Avatar;
