import Button from '../Button/Button'
import { DataContext } from '../../context/DataContext';
import { priceSort } from '../../features/dataFormSlice';
import { useDispatch } from 'react-redux';
export default function PriceSort() {

  const dispath_redux = useDispatch();
  return (
    <>
      <Button
        type="button"
        label="Price🔼"
        onClick={() => 
          dispath_redux(priceSort("UpToDown"))
        }
      />
      <Button
        type="button"
        label="Price🔽"
        onClick={() => 
          dispath_redux(priceSort("DownToUp"))
        }
      />
    </>
  )
}
