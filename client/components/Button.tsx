import { Loader } from "lucide-react";
import React from "react";

interface IProps {
  type: "button" | "submit" | "reset" | undefined;
  label: string;
  onClick?: () => void;
  title: string;
  loading?: boolean;
}

const Button = ({ type, label, onClick, title, loading }: IProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      title={title}
      className="w-full bg-accent text-white font-semibold text-base capitalize px-4 py-2 flex items-center justify-center  justify-self-end"
    >
      {loading ? (
        <span className="h-fit w-fit animate-spin">
          <Loader size={20} strokeWidth={1.75} />
        </span>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
