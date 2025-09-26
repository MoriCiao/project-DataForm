import { motion } from "framer-motion";
import Button from "../Button/Button";
type PageInputProps = {
  totalPages:number;
  changePage:string;
  setChangePage: React.Dispatch<React.SetStateAction<string>>;
  handlePage: () => void;
}

export default function PageInput({
  totalPages,
  changePage,
  setChangePage,
  handlePage,
}:PageInputProps) {
  return (
    <>
      <motion.input
        whileFocus={{ backgroundColor: "#F1F5F9", color: "#0F172A" }}
        transition={{ duration: 0.3 }}
        type="number"
        className={`bg-transparent text-center indent-[0.5rem] sm:w-[4rem] md:w-[8rem]`}
        placeholder="請輸入頁數..."
        step="1"
        min="1"
        max={totalPages}
        value={changePage}
        onChange={(e) => {
          setChangePage(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handlePage();
          }
        }}
      />

      <Button
        type="button"
        label="Go"
        className={`border-0`}
        onClick={handlePage}
        disable={changePage.trim() === "" }
      />
    </>
  );
}
