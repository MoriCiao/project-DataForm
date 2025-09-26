const STYLE = {
  loading_modal: "loading_modal absolute top-0 left-0 z-50 flex h-[100vh] w-[100vw] items-center justify-center bg-black/50 backdrop-blur-sm",

  loading_content : "loading_content flex h-[200px] w-[200px] items-center justify-center rounded-full bg-black/80 text-xl"
}


export default function LoadingModal() {
  return (
    <div className={STYLE.loading_modal}>
      <div className={STYLE.loading_content}>
        <span className="text-2xl">Loading...</span>
      </div>
    </div>
  );
}
