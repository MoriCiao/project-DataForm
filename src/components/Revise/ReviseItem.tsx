import React from 'react'
import Input from '../Input/Input'

export type RevisePageProp= {
    label:  string;
    type: string;
    name: string;
    value : string | number ;
    prevData:  string ;
    setReviseData : React.Dispatch<React.SetStateAction<Record<string , any>>>
}

const ReviseItem = ({ label, name, type, value ,prevData, setReviseData }:RevisePageProp) => {
  const handleChange = (e :React.ChangeEvent<HTMLInputElement>) => {
    setReviseData((prev :any) => ({ ...prev, [name]: e.target.value }));
  };
  return (
    <div className="flex w-full items-center justify-end">
      <span className="w-[10rem] flex-1 text-center">{label} :</span>
      <div className="flex w-[10rem] flex-1 justify-center">
        <p>{prevData}</p>
        <span>{`=>`}</span>
      </div>
      <div className="w-full flex-1">
        <Input
          type={type}
          value={value}
          className={`flex justify-center text-center text-black`}
          placeholder={prevData}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};

export default ReviseItem 