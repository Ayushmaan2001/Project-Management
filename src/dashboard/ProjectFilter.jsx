import { useState } from "react";
export default function ProjectFilter({ currentFilter, changeFilter }) {

  const filterList = [
    "all",
    "mine",
    "development",
    "marketing",
    "sales",
    "design",
  ];
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };
  return (
    <div className="project-filter">
      <nav>
        <p>Filter by:</p>
        {filterList.map((f) => {
          return (
            <button
              key={f}
              onClick={() => handleClick(f)}
              className={currentFilter === f ? "active" : ""}
            >
              {f}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
