import Button from "../Button/Button";
import { DataContext } from "../../context/DataContext";
import { priceSort } from "../../features/dataFormSlice";
import { useDispatch } from "react-redux";
import { Zoom } from "react-awesome-reveal";
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
