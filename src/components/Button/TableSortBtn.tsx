import { useDispatch, useSelector } from "react-redux";
import { perSort } from "../../features/dataFormSlice";
import { RootState } from "../../redux/store";
type SortCondition = {
  No: boolean;
  ID: boolean;
  Name: boolean;
  Brand: boolean;
  Category: boolean;
  Stock: boolean;
}

type TableProps = {
  // 需確認 name 為 props_sort_condition 裡的 key
  name: keyof SortCondition;
  className?: string | null;
  onClick: () => void;
};


export default function TableSortBtn({ name }: TableProps) {
  const { props_sort_condition} = useSelector(
    (state: RootState) => state.dataForm,
  );
  const dispath_redux = useDispatch();
  return (
    <button
      className="h-full w-auto"
      onClick={() =>
        dispath_redux(
          perSort({
            name: name,
            checked: props_sort_condition[name],
          }),
        )
      }
    >
      ↕️
    </button>
  );
}
