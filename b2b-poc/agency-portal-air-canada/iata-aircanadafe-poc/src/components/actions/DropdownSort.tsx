import React, { useState, useRef, useEffect } from "react";

// Define the type for the props
interface DropdownSortProps {
  align?: "left" | "right"; // Optional align prop with default value 'left'
}

const DropdownSort: React.FC<DropdownSortProps> = ({ align = "left" }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const dropdown = useRef<HTMLDivElement | null>(null);

  // Close the dropdown on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (
        dropdownOpen &&
        dropdown.current &&
        !dropdown.current.contains(target as Node) &&
        !trigger.current?.contains(target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  // Close the dropdown on Escape key press
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (dropdownOpen && keyCode === 27) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);

  return (
    <div className="relative inline-flex">
      {/* Trigger Button */}
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <div className="flex items-center truncate">
          <span className="truncate font-medium text-indigo-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            Date (Ascending)
          </span>
          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      <div
        ref={dropdown}
        className={`absolute mt-8 bg-white shadow-lg rounded-lg w-40 ${align === "right" ? "right-0" : "left-0"}`}
        style={{ display: dropdownOpen ? "block" : "none" }}
      >
        <ul>
          <li>
            <a
              href="#0"
              onClick={() => setDropdownOpen(false)}
              className="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex items-center py-1 px-3"
            >
              Date (Descending)
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownSort;
