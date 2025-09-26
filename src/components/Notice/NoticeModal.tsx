import  { useContext, useEffect, useRef } from "react";
import { Fade } from "react-awesome-reveal";
import { DataContext } from "../../context/DataContext";
import useLockedScroll from "../../hook/useLockedScroll";
import Button from "../Button/Button";

const STYLE ={
    notice_mask: "notice_mask fixed inset-0 z-70 flex w-screen items-start justify-center bg-black/50 backdrop-blur-sm",

    notice_content : "notice_content mt-20 flex w-[92vw] max-w-lg flex-col gap-4 rounded bg-black px-4 py-2 ring-2 ring-white/50",

    notice_text :"notice_text modal flex min-h-30 items-center justify-center border border-white/50 px-4"
}

const NoticeModal = () => {
  const { openModal, setOpenModal } = useContext(DataContext);
  const modalRef = useRef<HTMLDivElement | null>(null);
  useLockedScroll(openModal.isOpen);
  useEffect(() => {
    if (openModal && modalRef.current) modalRef.current.focus();
  }, [openModal]);
  return (
    <section className={STYLE.notice_mask}>
      <Fade direction="up" duration={500}>
        <div
          ref={modalRef}
          className={STYLE.notice_content}
        >
          <div className="flex justify-start">
            <h3 className="text-2xl font-bold">{openModal.title}</h3>
          </div>
          <div className={STYLE.notice_text}>
            <p className="text-xl">{openModal.text}</p>
          </div>
          <div className="flex justify-end py-2">
            <Button
              label="Confirm"
              type="button"
              className={`hover:scale-110 hover:bg-white`}
              onClick={() => setOpenModal(false)}
            />
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default NoticeModal;
