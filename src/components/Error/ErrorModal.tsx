import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function ErrorModal() {
  const { error } = useSelector((state: RootState) => state.dataForm);
  return (
    <div className="absolute top-0 left-0 flex h-[100vh] w-[100vw] items-center justify-center bg-black/80">
      <p className="flex h-[60%] w-[60%] items-center justify-center border-2 border-red-500 bg-black/50 px-8 text-xl text-red-500">
        {error}
      </p>
    </div>
  );
}
