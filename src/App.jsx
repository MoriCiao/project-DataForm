import { motion } from "framer-motion";
import { DataProvider } from "./context/DataContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import BgImage from "./assets/BgImage";
import Header from "./pages/Header";
import MainArea from "./pages/MainArea";

import "./style/style.css";

function App() {
  return (
    <Provider store={store}>
      <DataProvider>
        <div
          className={`APP-area relative text-white flex flex-col  w-full items-center`}
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
            className={`MainArea  flex flex-col items-center px-8 pt-4 mb-4 mx-8 h-auto w-auto max-w-[90vw]  overflow-overlay`}
          >
            <MainArea />
          </section>
        </div>
      </DataProvider>
    </Provider>
  );
}

export default App;
