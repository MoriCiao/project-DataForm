import { Zoom } from "react-awesome-reveal";
import { useSelector } from "react-redux";
import { CheckBox } from "../CheckBox";
import { RootState } from "../../redux/store";

export default function ProductStatus() {
  const { conditions } = useSelector((state: RootState) => state.dataForm);
  return (
    <Zoom duration={500} cascade damping={0.5} triggerOnce={true}>
      <CheckBox
        value="On_Sale"
        name="上架中"
        condition_type={conditions}
        selcetReducer="status"
      />
      <CheckBox
        value="Off_Sale"
        name="下架中"
        condition_type={conditions}
        selcetReducer="status"
      />
      <CheckBox
        value="Out_of_Stock"
        name="缺貨中"
        condition_type={conditions}
        selcetReducer="status"
      />
    </Zoom>
  );
}
