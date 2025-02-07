// import { useState } from "react";
// import "./searchBar.scss";
// import { Link } from "react-router-dom";

// const types = ["buy", "rent"];

// function SearchBar() {
//   const [query, setQuery] = useState({
//     type: "buy",
//     location: "",
//     minPrice: 0,
//     maxPrice: 0,
//     bedroom: 0,
//   });

//   const switchType = (val) => {
//     setQuery((prev) => ({ ...prev, type: val }));
//   };

//   const handleChange = e =>{
//     setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   }

//   return (
//     <div className="searchBar">
      // <div className="type">
      //   {types.map((type) => (
      //     <button
      //       key={type}
      //       onClick={() => switchType(type)}
      //       className={query.type === type ? "active" : ""}
      //     >
      //       {type}
      //     </button>
      //   ))}
      // </div>
//       <form>
//         <input type="text" name="city" placeholder="City" onChange={handleChange} />
//         <input
//           type="number"
//           name="minPrice"
//           min={0}
//           max={10000000}
//           placeholder="Min Price"
//           onChange={handleChange}
//         />
//         <input
//           type="number"
//           name="maxPrice"
//           min={0}
//           max={10000000000000}
//           placeholder="Max Price"
//           onChange={handleChange}
//         />
//         <input
//             type="number"
//             name="bedroom"
//             placeholder="Bedroom Number"
//             min={0}
//             max={100}
//             onChange={handleChange}
//           />
//         <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}&bedroom=${query.bedroom}`}>
//         <button>
//           <img src="/search.png" alt="" />
//         </button>
//         </Link>
        
//       </form>
//     </div>
//   );
// }

// export default SearchBar;


import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

const types = ["buy", "rent"];
const cities = ["Bangalore", "Hyderabad", "Chennai", "Gachibowli","Banjara Hills"];
const bedrooms = ["1bhk", "2bhk", "3bhk"];

function SearchBar({ isLoggedIn, onFilter }) {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
    bedroom: 0,
    cities: [],
    bedrooms: [],
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (e, key) => {
    const { value, checked } = e.target;
    setQuery((prev) => {
      const selected = prev[key];
      if (checked) {
        return { ...prev, [key]: [...selected, value] };
      } else {
        return { ...prev, [key]: selected.filter((item) => item !== value) };
      }
    });
  };

  const handleApplyFilter = (e) => {
    e.preventDefault();
    if (onFilter) {
      const filters = {
        minPrice: Number(query.minPrice) || 0,
        maxPrice: Number(query.maxPrice) || 100000000,
        cities: query.cities,
        bedrooms: query.bedrooms,
      };
      onFilter(filters);
    }
  };

  return (
    <div className="searchBar">
     
      {isLoggedIn ? (
         
        <form className="form1">
          <div className="filterSection">
            <div className="filterGroup">
            <h2>Filters</h2>
              <label>Price Range</label>
              <input
                type="number"
                name="minPrice"
                placeholder="Min Price"
                min="0"
                onChange={handleChange}
              />
              <input
                type="number"
                name="maxPrice"
                placeholder="Max Price (in ₹)"
                max="100000000"
                onChange={handleChange}
              />
            </div>
            <div className="filterGroup">
              <label>City</label>
              {cities.map((city) => (
                <div key={city}>
                  <input
                    type="checkbox"
                    value={city}
                    onChange={(e) => handleCheckboxChange(e, "cities")}
                  />
                  <label>{city}</label>
                </div>
              ))}
            </div>
            <div className="filterGroup">
              <label>Bedrooms</label>
              {bedrooms.map((bedroom) => (
                <div key={bedroom}>
                  <input
                    type="checkbox"
                    value={bedroom}
                    onChange={(e) => handleCheckboxChange(e, "bedrooms")}
                  />
                  <label>{bedroom}</label>
                </div>
              ))}
            </div>
            <button onClick={handleApplyFilter} className="button1">Apply Filter</button>
          </div>
        
        </form>
         
      ) : (
        <>
        <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
        <form className="form2">
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            min="0"
            onChange={handleChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            min="0"
            onChange={handleChange}
          />
          <input
            type="number"
            name="bedroom"
            placeholder="Bedrooms"
            min="0"
            max="10"
            onChange={handleChange}
          />
          <Link
            to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}&bedroom=${query.bedroom}`}
          >
            <button>
              <img src="/search.png" alt="" />
            </button>
          </Link>
        </form>
        </>)}
    </div>
  );
}

export default SearchBar;
