const STYLE = {
  header: `header flex h-[25vh] w-full items-center justify-center overflow-hidden pr-24 select-none sm:pt-8 md:pt-12 lg:h-[30vh] xl:pt-8 xl:pb-2`,
};

const Header = () => {
  return (
    <header className={STYLE.header}>
      <img
        className="object-cover md:w-[80%] xl:w-[50%]"
        src="/project-DataForm/Title-DataForm_header.webp"
        alt="Header圖片"
        loading="lazy"
        draggable="false"
      />
    </header>
  );
};

export default Header;
