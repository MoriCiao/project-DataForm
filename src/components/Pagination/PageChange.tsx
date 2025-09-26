import Button from "../Button/Button";

type PageChangeProps = {
  currentPage: number;
  totalPages: number ;
  goToPrevPage: () => void;
  goToNextPage:() => void; 
}

export default function PageChange({
  currentPage,
  totalPages,
  goToPrevPage,
  goToNextPage,
}:PageChangeProps) {
  return (
    <div className="flex gap-4">
      <Button
        type="button"
        label="Prev"
        onClick={goToPrevPage}
        disable={currentPage === 1}
      />

      <span>
        {currentPage} page / {totalPages} pages
      </span>
      <Button
        type="button"
        label="Next"
        onClick={goToNextPage}
        disable={currentPage === totalPages}
      />
    </div>
  );
}
