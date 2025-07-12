import { DataProvider } from "./context/DataContext";
import BgImage from "./assets/BgImage";
import Header from "./pages/Header";
import MainArea from "./pages/MainArea";
import Loading from "./components/Loading";

import "./style/style.css";

function App() {
  return (
    <DataProvider>
      <Loading />
      <div
        className={`APP-area relative text-[--text] flex flex-col h-screen w-full items-center`}
      >
        <BgImage />
        <Header />
        <MainArea />
      </div>
    </DataProvider>
  );
}

export default App;
