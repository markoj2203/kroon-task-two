import React, { useState } from "react";
import $ from "jquery";

export default function GitRepoUser({ item }) {
  const [active, setActive] = useState(false);
  const obj = item.files;

  const toggleClass = (event) => {
    let currentEventTarget = event.currentTarget;

    let img_id = currentEventTarget.children[0].getElementsByClassName(
      "repo-img"
    )[0].id;

    //remove class from dom
    var classElem = document.getElementsByClassName("active_row_element");
    while (classElem.length)
      classElem[0].classList.remove("active_row_element");

    $(`#${img_id}`).animate({ left: "50%" }, "slow");
    $(`#${img_id}`).animate({ left: "5%" }, "slow");

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
      onClick={toggleClass}
    >
      <div className="col-6">
        <img
          id={item.id}
          className="repo-img"
          src={item.owner.avatar_url}
          style={{ position: "relative" }}
        />
      </div>
      <div className="col-6 text-style">
        {obj[Object.keys(obj)[0]].filename}
      </div>
    </div>
  );
}
