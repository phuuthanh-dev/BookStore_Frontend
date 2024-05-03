import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: any;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const listPage: number[] = [];

  if (props.currentPage === 1) {
    listPage.push(props.currentPage);
    if (props.totalPages >= 2) {
      listPage.push(props.currentPage + 1);
    }
    if (props.totalPages >= 3) {
      listPage.push(props.currentPage + 2);
    }
  } else if (props.currentPage > 1) {
    // page -2
    if (props.currentPage > 2) {
      listPage.push(props.currentPage - 2);
    } 
    // page -1
    if (props.currentPage > 1) {
      listPage.push(props.currentPage - 1);
    }
    // page currently selected
    listPage.push(props.currentPage);
    // page + 1
    if (props.totalPages > props.currentPage) {
      listPage.push(props.currentPage + 1);
    } 
    // page + 2
    if (props.totalPages > props.currentPage + 1) {
      listPage.push(props.currentPage + 2);
    }
  }

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className="page-item">
          <button className="page-link" onClick={() => props.onPageChange(1)}>
            First page
          </button>
        </li>
        {listPage.map((page) => (
          <li className="page-item" key={page}>
            <button
              className={
                "page-link " + (props.currentPage === page ? "active" : "")
              }
              onClick={() => props.onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => props.onPageChange(props.totalPages)}
          >
            Last page
          </button>
        </li>
      </ul>
    </nav>
  );
};
