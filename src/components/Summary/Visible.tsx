import { CheckBox } from '../CheckBox'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
export default function Visible() {
  const { isVisible } = useSelector((state :RootState) => state.dataForm)
  return (
    <>
        <span className="px-2  sm:col-start-1 sm:col-span-2 sm:col-span-1 text-center text-[1.15rem]">
            Visible :
        </span>
        <div className="sm:col-start-3 sm:col-span-10 flex flex-wrap md:flex justify-around sm:gap-4 md:gap-8 w-fit items-center  p-2">
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
        </div>
    </>
  )
}
