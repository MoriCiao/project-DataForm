import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

export default function ErrorModal() {
    const { error } = useSelector((state:RootState)=> state.dataForm)
  return (
    <div className="absolute top-0 left-0 w-[100vw] h-[100vh] bg-black/80 flex items-center justify-center ">
        <p className=" border-2 border-red-500 w-[60%] h-[60%] flex items-center justify-center text-xl bg-black/50 text-red-500 px-8">
          {error}
        </p>
      </div>
  )
}
