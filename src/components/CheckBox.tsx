import { motion } from "framer-motion";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export const CheckBox = ({ value, name, dispatch_type, condition_type }) => {
  const { state, dispatch } = useContext(DataContext);

  return (
    <div className="check_id text-center">
      <motion.input
        animate={{ scale: state[condition_type][value] ? 1.5 : 1.25 }}
        transition={{ duration: 0.3 }}
        id={value}
        value={value}
        type="checkbox"
        checked={state[condition_type][value]}
        className="scale-125 mr-2"
        onChange={(e) =>
          dispatch({
            type: dispatch_type,
            payload: { key: value, checked: e.target.checked },
          })
        }
      />
      <label className="" htmlFor={value}>
        {name}
      </label>
    </div>
  );
};