import "./searchBar.css";

const SearchComponent = ({ searchQuery, handleSearch }) => {
  return (
    <div className="search-bar">
      <input
        className="form-control"
        type="search"
        placeholder="Search for name, email, or role"
        aria-label="Search"
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchComponent;
