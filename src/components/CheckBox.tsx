import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toggleFilterStatus, toggleFilterCategory,toggleVisible } from "../features/dataFormSlice";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

type SelectProps = ({
  selcetReducer: string
  value :string
  e :any
}) 


export const CheckBox = ({ value, name, condition_type, selcetReducer }) => {
  const { setCurrentPage } = useContext(DataContext)
  const dispath_redux = useDispatch();

  function SelectFn<SelectProps>(
    selcetReducer :string , 
    value :string , 
    e :any ){
    if(selcetReducer === "status") {
      dispath_redux(toggleFilterStatus({key : value, checked: e.target.checked})) 
      setCurrentPage(1)
    }else if(selcetReducer === "category") {
      dispath_redux(toggleFilterCategory({key : value, checked: e.target.checked}))
      setCurrentPage(1)
    }else if(selcetReducer === "isVisible"){
      dispath_redux(toggleVisible({key : value, checked: e.target.checked}))
    }
    
  }

  return (
    <div className="check_id text-center">
      <motion.input
        animate={{ scale: condition_type[value] ? 1.5 : 1.25 }}
        transition={{ duration: 0.3 }}
        id={value}
        value={value}
        type="checkbox"
        checked={condition_type[value]}
        className="scale-125 mr-2"
        onChange={(e) =>
          SelectFn(selcetReducer,value,e)
        }
      />
      <label className="" htmlFor={value}>
        {name}
      </label>
    </div>
  );
};