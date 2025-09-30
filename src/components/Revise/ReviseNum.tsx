import Input from "../Input/Input";
import { RevisePageProp } from "./ReviseItem";

const ReviseNum = ({
  label,
  name,
  value,
  type,
  prevData,
  setReviseData,
}: RevisePageProp) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviseData((prev: any) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <div className="flex w-full items-center justify-end">
      <span className="col-start-1 w-[10rem] text-center">{label} :</span>
      <div className="col-span-2 col-start-2 flex w-[10rem] justify-center">
        <p>{prevData}</p>
        <span>{`=>`}</span>
      </div>
      <Input
        type={type}
        value={value}
        min={"0"}
        step={"1"}
        className={`text-center text-black`}
        placeholder={prevData}
        onChange={handleChange}
        required
      />
    </div>
  );
};
export default ReviseNum;
