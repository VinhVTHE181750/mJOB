// src/components/SearchBar.js
import React, {useState} from 'react';
import '../../assets/css/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };
  // // console.log(query);

  return (    
      <input 
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
  );
};

export default SearchBar;
