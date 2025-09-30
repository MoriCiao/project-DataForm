const STYLE = {
  header: `header flex h-[25vh] items-center justify-center overflow-hidden pr-12 select-none sm:pt-8 md:pt-12 lg:h-[30vh] lg:pr-24 xl:pt-8 xl:pb-2`,
};

const imgSrc = {
  small: "/project-DataForm/DataForm-small.webp",
  medium: "/project-DataForm/DataForm-medium.webp",
  large: "/project-DataForm/DataForm-large.webp",
};

const { small, medium, large } = imgSrc;

const Header = () => {
  return (
    <header className={STYLE.header}>
      <img
        className="object-cover md:w-[80%] xl:w-[50%]"
        srcset={`${small} 480w, ${medium} 768w, ${large} 1280w`}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw"
        alt="Header圖片"
        loading="lazy"
        draggable="false"
      />
    </header>
  );
};

export default Header;
