import { useState } from "react";
import ReactPaginate from "react-paginate";
import "../../assets/styles/dashboard/pagination.css";


export default function PaginatedItems({ itemsPerPage, TotalData, setPage }) {
  const pageCount = Math.ceil(TotalData  / itemsPerPage);

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination d-flex align-items-center justify-content-end mb-0"
        pageLinkClassName="pagination-tag-anchor mx-1 rounded"
        activeLinkClassName="bg-primary text-white"
      />
    </>
  );
}