import React, { useState, useEffect } from "react";
import axios from "axios";
import GitRepoUser from "./GitRepoUser";
import Pagination from "./Pagination";

export default function Content() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [loading, setLoading] = useState(false);

  const scrollDown = (event) => {
    var div = document.getElementById("scroll-div");
    var pag = document.getElementById("pagination");

    if (div.scrollTop === div.scrollHeight - div.offsetHeight) {
      window.setTimeout(function () {
        pag.removeAttribute("hidden");
      }, 300);
    } else {
      window.setTimeout(function () {
        pag.setAttribute("hidden", "");
      }, 300);
    }
  };

  const getData = async () => {
    setLoading(true);
    await axios
      .get(`https://api.github.com/gists/public?per_page=100`)
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      });
    //nisam znao gde da pronadjem vise podataka (trazio sam na apiju ali nisam mogao da pronadjem)
    //pa sam uzeo ovaj njihov limit po stranici (per_page=100) da bih mogao da prikazem paginaciju
  };

  useEffect(() => {
    getData();
  }, []);

  //Get current post
  const indexOfLastPost = page * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost);

  //Change Page
  const paginate = (page) => {
    //remove class from dom
    var classElem = document.getElementsByClassName("active_row_element");
    while (classElem.length)
      classElem[0].classList.remove("active_row_element");
    setPage(page);
  };

  return (
    <div className="content">
      <div id="scroll-div" className="content-scroll" onScroll={scrollDown}>
        {currentPost.map((item, i) => (
          <div key={i}>
            <GitRepoUser item={item} />
          </div>
        ))}
      </div>
      <Pagination limit={limit} totalPosts={data.length} paginate={paginate} />
    </div>
  );
}
