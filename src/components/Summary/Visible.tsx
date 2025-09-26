import { Zoom } from "react-awesome-reveal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CheckBox } from "../CheckBox";
export default function Visible() {
  const { isVisible } = useSelector((state: RootState) => state.dataForm);
  return (
    <Zoom
      duration={500}
      cascade
      damping={0.5}
      triggerOnce={true}
      className="flex w-full flex-wrap items-center justify-center p-2 sm:gap-4 md:gap-2"
    >
      <p>Visible :</p>
      <CheckBox
        value="ID"
        name="ID"
        condition_type={isVisible}
        selcetReducer="isVisible"
      />
      <CheckBox
        value="Name"
        name="Name"
        condition_type={isVisible}
        selcetReducer="isVisible"
      />
      <CheckBox
        value="Brand"
        name="Brand"
        condition_type={isVisible}
        selcetReducer="isVisible"
      />
      <CheckBox
        value="Category"
        name="Category"
        condition_type={isVisible}
        selcetReducer="isVisible"
      />
      <CheckBox
        value="Price"
        name="Price"
        condition_type={isVisible}
        selcetReducer="isVisible"
      />
      <CheckBox
        value="Date"
        name="Date"
        condition_type={isVisible}
        selcetReducer="isVisible"
      />
      <CheckBox
        value="Status"
        name="Status"
        condition_type={isVisible}
        selcetReducer="isVisible"
      />
      <CheckBox
        value="Stock"
        name="Stock"
        condition_type={isVisible}
        selcetReducer="isVisible"
      />
      <CheckBox
        value="Tags"
        name="Tags"
        condition_type={isVisible}
        selcetReducer="isVisible"
      />
    </Zoom>
  );
}
