export default function LoadingModal() {

  return (
    <div className="loading-modal absolute top-0 left-0 z-50 w-[100vw] h-[100vh] bg-black/50 flex items-center justify-center backdrop-blur-sm">
        <div className="loading-svg rounded-full w-[200px] h-[200px] flex items-center justify-center text-xl bg-black/80 ">
            <span className='text-2xl'>Loading...</span>
        </div>
    </div>
  )
}
