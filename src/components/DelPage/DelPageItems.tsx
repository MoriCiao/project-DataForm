import { STYLE } from "./DelPageStyle";

type Data = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  createdAt: string;
  status: string;
  stock: number;
  tags: string[];
};

type DelThProps = {
  value: string;
};

type DelTrProps = {
  data: Data;
  index: number;
};

export const DelTh = ({ value }: DelThProps) => (
  <th className={STYLE.delPage_th}>{value}</th>
);

export const DelTr = ({ data, index }: DelTrProps) => (
  <tr className="h-[1.5rem] text-center">
    <td className={STYLE.delPage_td}>{index + 1}</td>
    <td className={STYLE.delPage_td}>{data.id}</td>
    <td className={STYLE.delPage_td}>{data.name}</td>
    <td className={STYLE.delPage_td}>{data.brand}</td>
    <td className={STYLE.delPage_td}>{data.category}</td>
    <td className={STYLE.delPage_td}>${data.price}</td>
    <td className={STYLE.delPage_td}>{data.createdAt}</td>
    <td className={STYLE.delPage_td}>{data.status}</td>
    <td className={STYLE.delPage_td}>{data.stock}</td>
    <td className={STYLE.delPage_td}>{data.tags}</td>
  </tr>
);
