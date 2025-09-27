import { Zoom } from "react-awesome-reveal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CheckBox } from "../CheckBox";

type SwitchValue = "house" | "stationery" | "electronics" | "sporting_goods" |"food_and_beverage"

const valid_cate = ['house', 'stationery', 'electronics', 'sporting_goods', 'food_and_beverage']

function ProductCategoryMap(cate :SwitchValue):string{
  switch(cate){
    case "house": return "居家生活"
    case "stationery": return "文具用品"
    case "electronics": return "電子產品"
    case "sporting_goods": return "運動用品"
    case "food_and_beverage": return "食品飲料"
  }
}

function isSwitchValue(value: string): value is SwitchValue {
  return valid_cate.includes(value as SwitchValue);
}


export default function ProductCategory() {
  const { cate_Condition } = useSelector((state: RootState) => state.dataForm);
  const cate_ConditionList = Object.keys(cate_Condition)
  return (
    <Zoom duration={800} cascade damping={0.5} triggerOnce={true}>
      {cate_ConditionList && cate_ConditionList.filter(isSwitchValue).map((cate) => (
        <CheckBox 
          key={cate} 
          value={cate} 
          name={ProductCategoryMap(cate)} 
          condition_type={cate_Condition} 
          selcetReducer="category"/>
      ))}
    </Zoom>
  );
}
