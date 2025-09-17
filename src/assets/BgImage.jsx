import React from "react";

const BgImage = () => {
  return (
    <section className="dataForm-bg pointer-events-none fixed top-0 left-0 z-[-2] h-full w-full overflow-hidden opacity-25 select-none">
      <img
        className="h-full w-full object-cover"
        src="/project-DataForm/bg_img.webp"
        alt="BgImage"
      />
    </section>
  );
};

export default BgImage;
