export default function LoadingModal() {
  return (
    <div className="loading-modal absolute top-0 left-0 z-50 flex h-[100vh] w-[100vw] items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="loading-svg flex h-[200px] w-[200px] items-center justify-center rounded-full bg-black/80 text-xl">
        <span className="text-2xl">Loading...</span>
      </div>
    </div>
  );
}
