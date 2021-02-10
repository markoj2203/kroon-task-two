import React from "react";

export default function Pagination({ limit, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / limit); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="pagination-nav">
      <ul id="pagination" className="pagination" hidden>
        {pageNumbers.map((number, i) => (
          <li key={i} className="page-item">
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
