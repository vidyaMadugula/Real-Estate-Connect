
import { useContext, useState, Suspense } from "react";
import { Await, useLoaderData, Link } from "react-router-dom";
import List from "../../components/list/List";
import { AuthContext } from "../../context/AuthContext";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";

function HomePage() {
  const { currentUser } = useContext(AuthContext);
  const data = useLoaderData();
  const [filteredPosts, setFilteredPosts] = useState(null);
  const [showFilter, setShowFilter] = useState(false); // State to toggle filter

  const handleFilter = (filters, allPosts) => {
    const filtered = allPosts.filter((post) => {
      const matchesPrice =
        post.price >= filters.minPrice && post.price <= filters.maxPrice;
      const matchesCity =
        filters.cities.length === 0 || filters.cities.includes(post.city );
      const matchesBedroom =
        filters.bedrooms.length === 0 ||
        filters.bedrooms.includes(`${post.bedroom || "0"}bhk`);
      return matchesPrice && matchesCity && matchesBedroom;
    });
    setFilteredPosts(filtered.length > 0 ? filtered : []);
    setShowFilter(false); // Hide filter after applying
  };

  // const handleFilter = (filters,allPosts) => {
  //   console.log("Filtering triggered");
  //   console.log("Filters:", filters);
  //   console.log("All Posts:", allPosts);
  
  //   const result = allPosts.filter((post) => {
  //     const price = post.price ?? 0;
  //     const cityName = (post.city ?? post.address ?? "").toLowerCase();
  //     const beds = String(post.bedroom ?? post.bedrooms ?? 0);
  //     const type = post.type ?? "";
  
  //     const inPriceRange =
  //       price >= filters.minPrice && price <= filters.maxPrice;
  
  //     const matchesCity =
  //       filters.cities.length === 0 ||
  //       filters.cities.some((c) => cityName.includes(c.toLowerCase()));
  
  //     const matchesBedroom =
  //       filters.bedrooms.length === 0 ||
  //       filters.bedrooms.includes(`${beds}bhk`);
  
  //     const matchesType =
  //       !filters.type || filters.type.toLowerCase() === type.toLowerCase();
  
  //     const isMatch = inPriceRange && matchesCity && matchesBedroom && matchesType;
  
  //     console.log({
  //       price,
  //       cityName,
  //       beds,
  //       type,
  //       inPriceRange,
  //       matchesCity,
  //       matchesBedroom,
  //       matchesType,
  //       isMatch,
  //     });
  
  //     return isMatch;
  //   });
  
  //   setFilteredPosts(result);
  //   setShowFilter(false);
  // };
  
  
  const renderContent = (postResponse) => {
    const allPosts = postResponse?.data || [];
    const allPostsToDisplay = filteredPosts !== null ? filteredPosts : allPosts;

    return (
      <div className="homePage">
        {/* Sidebar (Filter) */}
        <div className={`leftside ${showFilter ? "show" : ""}`}>
          <SearchBar
            isLoggedIn={true}
            onFilter={(filters) => handleFilter(filters, allPosts)}
          />
        </div>

        {/* Hide the rightside content when filter is open */}
        <div className={`rightside ${showFilter ? "hidden" : ""}`}>
          <div className="title">
            <h1 className="myListHeading">All Posts</h1>

            {/* Buttons Wrapper */}
            <div className="actionButtons">
              <button className="filterButton" onClick={() => setShowFilter(!showFilter)}>
                {showFilter ? "Close Filters" : "Filter"}
              </button>
              <Link to="/add">
                <button className="createPostButton">Create New Post</button>
              </Link>
            </div>
          </div>

          {allPostsToDisplay.length > 0 ? (
            <List posts={allPostsToDisplay} />
          ) : (
            <p className="noMatchMessage">
              No posts match the selected filters. Please try again.
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="homePage">
      {currentUser ? (
        <Suspense fallback={<p>Loading posts...</p>}>
          <Await resolve={data.postResponse}>{renderContent}</Await>
        </Suspense>
      ) : (
        <div className="homePage">
          <div className="textContainer">
            <div className="wrapper">
              <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
              <SearchBar/>
              <div className="boxes"></div>
            </div>
          </div>
          <div className="imgContainer">
            <img src="/bg.png" alt="" />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;