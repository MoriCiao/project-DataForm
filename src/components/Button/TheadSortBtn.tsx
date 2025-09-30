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
};

type TableProps = {
  // 需確認 name 為 props_sort_condition 裡的 key
  name: keyof SortCondition;
  className?: string | null;
  onClick: () => void;
};

const th_style =
  "h-full min-w-[10rem] border bg-[--theme-Secondary] px-4 select-none ";

const SortNameMap = ["ID", "Name", "Brand", "Category", "Stock"];

export default function TheadSortBtn({ name, className }: TableProps) {
  const { props_sort_condition } = useSelector(
    (state: RootState) => state.dataForm,
  );
  const dispath_redux = useDispatch();

  const hasName = SortNameMap.includes(name);
  return (
    <th
      className={`${th_style} ${hasName ? "cursor-pointer transition duration-500 hover:bg-gray-500" : "cursor-not-allowed"} ${className} `}
      onClick={() => {
        if (hasName) {
          dispath_redux(
            perSort({
              name: name,
              checked: props_sort_condition[name],
            }),
          );
        }
      }}
    >
      {name} {hasName ? "🔃" : null}
    </th>
  );
}
