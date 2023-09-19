import TRANSLATIONS from "@/CONSTS/translations";
import useTranslation from "@/hooks/useTranslation";
import { Pencil } from "lucide-react";
import AVATARS from "@/CONSTS/avatars";
import { useState } from "react";

interface IProps {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  image: string;
}

const AvatarSelect = ({ setImage, image }: IProps) => {
  const { language } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleAvatar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget as HTMLDivElement;

    const avatarName = target.getAttribute("id") as string;
    setImage(avatarName);
    setOpen(false);
  };

  return (
    <>
      <div className="relative w-full flex items-center justify-center">
        <div className="w-[70px] relative">
          <div className=" w-[70px] h-[70px] overflow-hidden rounded-full flex items-start justify-center border border-border-color bg-white p-1">
            <img
              className="w-3/4"
              src={`/images/avatars/${image}.webp`}
              alt=""
            />
          </div>

          <button
            type="button"
            onClick={handleOpen}
            title={TRANSLATIONS[language].labels.edit}
            className="absolute top-11 right-0 bg-white p-1 rounded-full shadow-md"
          >
            <Pencil size={16} strokeWidth={1} />
          </button>
        </div>

        {open ? (
          <div className="bg-background-primary shadow-lg shadow-shadow-color p-4  absolute z-50 w-full max-w-96 right-1/2 translate-x-1/2 top-[calc(100%+10px)] ">
            <p className="mb-2 font-medium">
              {TRANSLATIONS[language].labels.chooseAvatar}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {AVATARS.map((avatar, i) => {
                return (
                  <div
                    key={i}
                    id={avatar}
                    onClick={(e) => handleAvatar(e)}
                    className="w-14 h-14 overflow-hidden rounded-full flex items-start justify-center border border-border-color bg-white p-1 cursor-pointer"
                  >
                    <img
                      className="w-3/4"
                      src={`/images/avatars/${avatar}.webp`}
                      alt={avatar}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      {open ? (
        <div
          onClick={handleOpen}
          className="bg-transparent absolute inset-0"
        ></div>
      ) : null}
    </>
  );
};

export default AvatarSelect;
