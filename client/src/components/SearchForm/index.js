import React from "react";

function SearchForm({q, handleSearch, handleFormSubmit }) {
  return (
    <form>
      <div className="form-row">
        <div className="col-md-11">
          <input
            className="form-control"
            id="Title"
            type="text"
            value={q}
            placeholder="Search Company Name"
            name="q"
            onChange={handleSearch}
            required
          />
      </div>
      <div className="col-md-1">
        <button
          onClick={handleFormSubmit}
          type="submit"
          className="btn btn-danger">
          Search
        </button>
      </div>
      </div>
    </form>
  );
}

export default SearchForm;