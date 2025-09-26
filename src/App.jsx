import { motion } from "framer-motion";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { DataProvider } from "./context/DataContext";
import BgImage from "./components/BgImage";
import Header from "./pages/Header";
import MainArea from "./pages/MainArea";
import "./style/style.css";

function App() {
  return (
    <Provider store={store}>
      <DataProvider>
        <div
          className={`APP-area relative flex w-full flex-col items-center text-white`}
        >
          <BgImage />
          <motion.section
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
            className="header"
          >
            <Header />
          </motion.section>
          <section
            className={`MainArea overflow-overlay mx-8 mb-4 flex h-auto w-auto max-w-[90vw] flex-col items-center px-8 pt-4`}
          >
            <MainArea />
          </section>
        </div>
      </DataProvider>
    </Provider>
  );
}

export default App;
