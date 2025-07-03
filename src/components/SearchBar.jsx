import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState(""); // Quản lý từ khóa tìm kiếm

  // Hàm xử lý sự kiện khi nhấn submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      onSearch(query); // Gọi hàm onSearch từ parent component
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full max-w-sm rounded-full border-2 border-gray-300 bg-white">
      <input
        type="text"
        placeholder="Search images..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 rounded-full focus:outline-none text-gray-800"
      />
      <button type="submit" className="m-1 mr-2 p-2 rounded-full bg-[#354a2f] text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </form>
  );
}

export default SearchBar;
