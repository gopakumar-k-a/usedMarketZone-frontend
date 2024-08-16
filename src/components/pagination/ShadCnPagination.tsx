import { Button } from '../ui/button';

const ShadCnPagination = ({ currentPage, totalPages, onPageChange }:{ currentPage:number, totalPages:number, onPageChange:(page:number)=>void }) => {
  const maxPageButtons = 7; // Maximum number of page buttons to display
  const pageButtonsToShow = Math.min(totalPages, maxPageButtons); // Limit to totalPages or maxPageButtons

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const halfButtons = Math.floor(pageButtonsToShow / 2);
    let startPage = Math.max(1, currentPage - halfButtons);
    let endPage = startPage + pageButtonsToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - pageButtonsToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center my-4 space-x-2">
      <Button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Previous
      </Button>

      {getPageNumbers().map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`px-4 py-2 ${
            pageNumber === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-blue-500 text-blue-900'
          } rounded hover:bg-blue-600`}
        >
          {pageNumber}
        </Button>
      ))}

      <Button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Next
      </Button>
    </div>
  );
};

export default ShadCnPagination;
