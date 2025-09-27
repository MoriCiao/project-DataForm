import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Zoom } from "react-awesome-reveal";
import { CheckBox } from "../CheckBox";

type SwitchVisible= "ID"|
  "Name"|
  "Brand" |
  "Category" |
  "Price" |
  "Date" |
  "Status" |
  "Stock"|
  "Tags"

const VisibleList = [
  "ID", 
  "Name",
  "Brand",
  "Category",
  "Price",
  "Date",
  "Status",
  "Stock",
  "Tags"]

function isVaildValue(value:string): value is SwitchVisible{
  return VisibleList.includes(value as SwitchVisible)
}

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
      {VisibleList && VisibleList.filter(isVaildValue).map(v=>(
        <CheckBox
          key={v}
          value={v}
          name={v}
          condition_type={isVisible}
          selcetReducer="isVisible"
        />
      ))}
    </Zoom>
  );
}
