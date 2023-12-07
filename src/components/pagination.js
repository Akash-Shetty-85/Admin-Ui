import React from "react";
import "./pagination.css";

function PaginationComponent({
  userList,
  handleDeleteSelected,
  usersPerPage,
  totalUsers,
  currentPage,
  paginate,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageNumbers.length;

  return (
    <div>
      {userList.length ? (
        <div>
          <div className="delete-button">
            <button
              className="btn btn-danger"
              onClick={handleDeleteSelected}
            >
              DELETE SELECTED
            </button>
          </div>
          <div className="d-flex align-items-center justify-content-center m-3">
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item">
                  <button
                    className="page-link rounded-circle custom-rounded-button"
                    onClick={() => paginate(1)}
                    aria-label="First"
                    disabled={isFirstPage}
                  >
                    <span aria-hidden="true">&laquo;&laquo;</span>
                  </button>
                </li>
                <li className="page-item">
                  <button
                    className={`page-link rounded-circle custom-rounded-button ${isFirstPage ? "disabled" : ""
                      }`}
                    onClick={() => paginate(currentPage - 1)}
                    aria-label="Previous"
                    disabled={isFirstPage}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                {pageNumbers.map((number) => (
                  <li key={number} className="page-item">
                    <button
                      onClick={() => paginate(number)}
                      className={`page-link rounded-circle custom-rounded-button ${currentPage === number ? "active" : ""
                        }`}
                      aria-label={`Page ${number}`}
                    >
                      {number}
                    </button>
                  </li>
                ))}
                <li className="page-item">
                  <button
                    className={`page-link rounded-circle custom-rounded-button ${isLastPage ? "disabled" : ""
                      }`}
                    onClick={() => paginate(currentPage + 1)}
                    aria-label="Next"
                    disabled={isLastPage}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
                <li className="page-item">
                  <button
                    className="page-link page-link rounded-circle
                    custom-rounded-button"
                    onClick={() => paginate(pageNumbers.length)}
                    aria-label="Last"
                    disabled={isLastPage}
                  >
                    <span aria-hidden="true">&raquo;&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PaginationComponent;
