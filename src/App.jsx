import { DataProvider } from "./context/DataContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import BgImage from "./assets/BgImage";
import Header from "./pages/Header";
import MainArea from "./pages/MainArea";
import Loading from "./components/Loading";

import "./style/style.css";

function App() {
  return (
    <Provider store={store}>
      <DataProvider>
        <Loading />
        <div
          className={`APP-area relative text-white flex flex-col h-screen w-full items-center`}
        >
          <BgImage />
          <Header />
          <MainArea />
        </div>
      </DataProvider>
    </Provider>
  );
}

export default App;
