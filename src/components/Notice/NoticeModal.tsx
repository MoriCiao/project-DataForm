import  { useContext, useEffect, useRef } from "react";
import useLockedScroll from "../../hook/useLockedScroll";
import Button from "../Button/Button";
import { DataContext } from "../../context/DataContext";
import { Fade } from "react-awesome-reveal";

const NoticeModal = () => {
  const { openModal, setOpenModal } = useContext(DataContext);
  const modalRef = useRef<HTMLDivElement | null>(null);
  useLockedScroll(openModal.isOpen);
  useEffect(() => {
    if (openModal && modalRef.current) modalRef.current.focus();
  }, [openModal]);
  return (
    <section className="notice fixed inset-0 z-70 flex w-screen items-start justify-center bg-black/50 backdrop-blur-sm">
      <Fade direction="up" duration={500}>
        <div
          ref={modalRef}
          className="mt-20 flex w-[92vw] max-w-lg flex-col gap-4 rounded bg-black px-4 py-2 ring-2 ring-white/50"
        >
          <div className="flex justify-start">
            <h3 className="text-2xl font-bold">{openModal.title}</h3>
          </div>
          <div className="modal flex min-h-30 items-center justify-center border border-white/50 px-4">
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
