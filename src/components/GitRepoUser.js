import React, { useState } from "react";

export default function GitRepoUser({ item }) {
  const [active, setActive] = useState(false);
  const obj = item.files;

  const toggleClass = (className) => {
    //remove class from dom
    var classElem = document.getElementsByClassName(className);
    while (classElem.length) classElem[0].classList.remove(className);

    const currentState = active;
    setActive(!currentState);
  };

  return (
    <div
      className={
        active
          ? "row clickable_element active_row_element"
          : "row clickable_element"
      }
      onClick={() => toggleClass("active_row_element")}
    >
      <div className="col-6">
        <img className="repo-img" src={item.owner.avatar_url} />
      </div>
      <div className="col-6 text-style">
        {obj[Object.keys(obj)[0]].filename}
      </div>
    </div>
  );
}
