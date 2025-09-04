import PriceSort from "../components/PriceSort/PriceSort";
import ProductStatus from "../components/Summary/ProductStatus";
import ProductCategory from "../components/Summary/ProductCategory";
import Visible from "../components/Summary/Visible";

const ResultSummary = () => {
  return (
    <section className="resultSummary flex">
      <details className="w-full">
        <summary className="cursor-pointer select-none pb-2">快速篩選</summary>

        <div className="md:grid md:grid-cols-8 sm:grid gap-4">
          <div className="status-area border border-white/50 flex flex-wrap p-2 md:col-span-2 md:col-start-1 gap-2 justify-center items-center">
            <ProductStatus />
          </div>
          <div className="category-area xl:flex xl:flex-wrap border border-white/50 p-2 md:col-span-4 md:col-start-3 xl:gap-4 md:grid md:grid-cols-3 md:gap-2 sm:grid sm:grid-cols-3 justify-center items-center">
            <ProductCategory />
          </div>

          <div className="border border-white/50 p-2 xl:flex  xl:gap-2 md:flex md:gap-4 md:p-2 sm:gap-12 sm:grid sm:grid-cols-2 sm:p-6 md:col-span-5 md:col-start-7 gap-2 justify-center items-center">
            <PriceSort />
          </div>
        </div>
        <hr className="my-4 border-white/25" />
        <div className="xl:flex md:grid md:grid-cols-8 sm:grid sm:grid-cols-12 gap-2 items-center justify-center border border-white/50 py-2">
          <Visible />
        </div>
      </details>
    </section>
  );
};

export default ResultSummary;
