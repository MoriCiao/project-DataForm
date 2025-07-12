import React from "react";

const BgImage = () => {
  return (
    <section className="dataForm-bg fixed z-[-2] top-0 left-0 w-full h-full overflow-hidden opacity-25 select-none pointer-events-none">
      <img
        className="w-full h-full object-cover"
        src="/project-DataForm/bg_img.jpg"
        alt="BgImage"
      />
    </section>
  );
};

export default BgImage;
