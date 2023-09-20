import React from "react";
import LanguageSelect from "./LanguageSelect";

const Header = () => {
  return (
    <header className="bg-background-primary shadow-md py-4 text-text-color ">
      <div className="max-w-4xl m-auto flex items-center justify-between px-4">
        <a href="/">
          <h2 className="text-xl font-semibold w-fit">Notably</h2>
        </a>

        <div>
          <LanguageSelect />
        </div>
      </div>
    </header>
  );
};

export default Header;
