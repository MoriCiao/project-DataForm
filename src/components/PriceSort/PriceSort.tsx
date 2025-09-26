import { Zoom } from "react-awesome-reveal";
import { useDispatch } from "react-redux";
import { priceSort } from "../../features/dataFormSlice";
import Button from "../Button/Button";
export default function PriceSort() {
  const dispath_redux = useDispatch();
  return (
    <Zoom duration={500} cascade damping={0.5} triggerOnce={true}>
      <Button
        type="button"
        label="Price🔼"
        onClick={() => dispath_redux(priceSort("UpToDown"))}
      />
      <Button
        type="button"
        label="Price🔽"
        onClick={() => dispath_redux(priceSort("DownToUp"))}
      />
    </Zoom>
  );
}
