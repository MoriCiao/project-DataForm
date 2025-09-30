import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Zoom } from "react-awesome-reveal";
import { CheckBox } from "../CheckBox";

type SwitchValue = "On_Sale" | "Off_Sale" | "Out_of_Stock";

const ProductStatusList = ["On_Sale", "Off_Sale", "Out_of_Stock"];

function ProductStatusMap(value: SwitchValue) {
  switch (value) {
    case "On_Sale":
      return "上架中";
    case "Off_Sale":
      return "下架中";
    case "Out_of_Stock":
      return "缺貨中";
  }
}

function isSwitchValue(value: string): value is SwitchValue {
  return ProductStatusList.includes(value as SwitchValue);
}

export default function ProductStatus() {
  const { conditions } = useSelector((state: RootState) => state.dataForm);
  return (
    <Zoom duration={500} cascade damping={0.5} triggerOnce={true}>
      {ProductStatusList &&
        ProductStatusList.filter(isSwitchValue).map((status) => (
          <CheckBox
            key={status}
            value={status}
            name={ProductStatusMap(status)}
            condition_type={conditions}
            selcetReducer="status"
          />
        ))}
    </Zoom>
  );
}
