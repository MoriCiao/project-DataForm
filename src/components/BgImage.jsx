const STYLE = {
  bg: `dataForm-bg pointer-events-none fixed top-0 left-0 z-[-2] h-full w-full overflow-hidden opacity-25 select-none`,
};

const BgImage = () => {
  return (
    <section className={STYLE.bg}>
      <img
        className="h-full w-full object-cover"
        src="/project-DataForm/bg_img.webp"
        alt="背景圖片"
        loading="lazy"
      />
    </section>
  );
};

export default BgImage;
