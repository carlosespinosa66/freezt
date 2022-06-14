import React from "react";

export default function Paging({
  productsPerPage,
  allProducts,
  showProducts,
  currentPage,
}) {
  const pageNumber = [];
  for (let i = 0; i < Math.ceil(allProducts / productsPerPage); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <ul className="paging">
      <button
        disabled={currentPage > 1 ? false : true}
        onClick={() => showProducts(1)}
      >
        <i className="material-icons">keyboard_double_arrow_left</i>
      </button>
      <button
        disabled={currentPage > 1 ? false : true}
        onClick={() => showProducts(currentPage - 1)} >
        <i className="material-icons">keyboard_arrow_left</i>
      </button>
      {pageNumber &&
        pageNumber.map((number) => (
          <li
            className={currentPage === number ? "paging_current" : "paging"}
            key={number}
          >
            <a onClick={() => showProducts(number)}>{number}</a>
          </li>
        ))}
      <button
        disabled={currentPage < pageNumber.length ? false : true}
        onClick={() => showProducts(currentPage + 1)}
      >
        <i className="material-icons">keyboard_arrow_right</i>
      </button>
      <button
        disabled={currentPage < pageNumber.length ? false : true}
        onClick={() => showProducts(pageNumber.length)}
      >
        <i className="material-icons">keyboard_double_arrow_right</i>
      </button>
    </ul>
  );
}
