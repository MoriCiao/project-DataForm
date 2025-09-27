import { motion } from "framer-motion";
import { useDispatch, } from "react-redux";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import {
  toggleFilterStatus,
  toggleFilterCategory,
  toggleVisible,
} from "../features/dataFormSlice";

type conditions = {
    On_Sale: boolean, // 上架中
    Off_Sale: boolean, // 下架
    Out_of_Stock: boolean, // 缺貨
  }
type cate_Condition = {
    house: boolean,
    stationery: boolean,
    electronics: boolean,
    sporting_goods: boolean,
    food_and_beverage: boolean,
  }
type isVisible = {
    ID: boolean,
    Name: boolean,
    Brand: boolean,
    Category: boolean,
    Price: boolean,
    Date: boolean,
    Status: boolean,
    Stock: boolean,
    Tags: boolean,
  }
type AllConditionKeys = 
  | keyof conditions
  | keyof cate_Condition
  | keyof isVisible

type CheckBoxProps<T extends conditions | cate_Condition | isVisible> = {
  value: keyof T;
  name: string;
  condition_type: T
  selcetReducer:  "status" | "category" |"isVisible"
}


export const CheckBox = <T extends conditions | cate_Condition | isVisible>({ value, name, condition_type, selcetReducer}:CheckBoxProps<T>): React.ReactNode => {
  const { setCurrentPage } = useContext(DataContext);
  const dispatch_redux = useDispatch();

  function SelectFn(selcetReducer: string, value: keyof T, e: React.ChangeEvent<HTMLInputElement>) {
    if (selcetReducer === "status") {
      dispatch_redux(
        toggleFilterStatus({ key: value, checked: e.target.checked }),
      );
      setCurrentPage(1);
    } else if (selcetReducer === "category") {
      dispatch_redux(
        toggleFilterCategory({ key: value, checked: e.target.checked }),
      );
      setCurrentPage(1);
    } else if (selcetReducer === "isVisible") {
      dispatch_redux(toggleVisible({ key: value, checked: e.target.checked }));
    }
  }
  return (
    <div className="check_id text-center">
      <motion.input
        animate={{ scale: condition_type[value] ? 1.5 : 1.25 }}
        transition={{ duration: 0.3 }}
        id={value as string}
        value={value as string}
        type="checkbox"
        checked={condition_type[value] as boolean}
        className="mr-2 scale-125"
        onChange={(e) => SelectFn(selcetReducer, value, e)}
      />
      <label>
        {name}
      </label>
    </div>
  );
};
