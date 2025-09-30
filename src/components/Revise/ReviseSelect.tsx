import Select from "../Select/Select";
import { RevisePageProp } from "./ReviseItem";

const ReviseSelect = ({
  label,
  name,
  value,
  prevData,
  setReviseData,
}: RevisePageProp) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReviseData((prev: any) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <div className="flex w-full items-center justify-end">
      <span className="col-start-1 w-[10rem] text-center">{label} :</span>
      <div className="col-span-2 col-start-2 flex w-[10rem] justify-center">
        <p>{prevData}</p>
        <span>{`=>`}</span>
      </div>
      <Select
        name={name}
        value={value}
        className={"flex items-center text-center text-black"}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default ReviseSelect;
