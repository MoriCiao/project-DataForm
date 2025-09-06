import React from "react";

const Header = () => {
  return (
    <header className="w-full lg:h-[30vh] h-[25vh] flex items-center justify-center pr-24 xl:pt-8 xl:pb-2 md:pt-12 sm:pt-8 select-none overflow-hidden">
      <img
        className="xl:w-[50%] md:w-[80%] object-cover"
        src="/project-DataForm/Title-DataForm_header.webp"
        alt="Title_DataForm"
        loading="lazy"
        draggable="false"
      />
    </header>
  );
};

export default Header;
