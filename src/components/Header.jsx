import React from 'react';

const Header = ({ setSearchQuery }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">News Dashboard</h1>
      <input
        type="text"
        placeholder="Search news..."
        className="p-2 rounded text-black"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </header>
  );
};

export default Header;
