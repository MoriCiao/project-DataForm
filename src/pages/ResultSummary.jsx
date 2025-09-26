import { Zoom } from "react-awesome-reveal";
import PriceSort from "../components/PriceSort/PriceSort";
import ProductStatus from "../components/Summary/ProductStatus";
import ProductCategory from "../components/Summary/ProductCategory";
import Visible from "../components/Summary/Visible";

const ResultSummary = () => {
  return (
    <section className="resultSummary flex">
      <details className="w-full">
        <summary className="cursor-pointer pb-2 select-none hover:text-sky-500">
          快速篩選
        </summary>

        <div className="gap-4 sm:grid md:grid md:grid-cols-8">
          <Zoom
            duration={500}
            cascade
            damping={0.5}
            triggerOnce={true}
            className="status-area flex flex-wrap items-center justify-center gap-2 border border-white/50 p-2 md:col-span-2 md:col-start-1"
          >
            <ProductStatus />
          </Zoom>

          <Zoom
            duration={500}
            cascade
            damping={0.5}
            triggerOnce={true}
            className="category-area items-center justify-center border border-white/50 p-2 sm:grid sm:grid-cols-3 md:col-span-4 md:col-start-3 md:grid md:grid-cols-3 md:gap-2 xl:flex xl:flex-wrap xl:gap-4"
          >
            <ProductCategory />
          </Zoom>

          <Zoom
            duration={500}
            cascade
            damping={0.5}
            triggerOnce={true}
            className="items-center justify-center gap-2 border border-white/50 p-2 sm:grid sm:grid-cols-2 sm:gap-12 sm:p-6 md:col-span-5 md:col-start-7 md:flex md:gap-4 md:p-2 xl:flex xl:gap-2"
          >
            <PriceSort />
          </Zoom>
        </div>
        <hr className="my-4 border-white/25" />
        <Zoom
          duration={500}
          cascade
          damping={0.5}
          triggerOnce={true}
          className="flex items-center border border-white/50 py-2"
        >
          <Visible />
        </Zoom>
      </details>
    </section>
  );
};

export default ResultSummary;
