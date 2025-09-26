import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const STYLE = {
  error_modal : "error_modal absolute top-0 left-0 flex h-[100vh] w-[100vw] items-center justify-center bg-black/80",

  error_content : "error_content flex h-[60%] w-[60%] items-center justify-center border-2 border-red-500 bg-black/50 px-8 text-xl text-red-500"
}


export default function ErrorModal() {
  const { error } = useSelector((state: RootState) => state.dataForm);
  return (
    <div className={STYLE.error_modal}>
      <p className={STYLE.error_content}>
        {error}
      </p>
    </div>
  );
}
