

import { useContext } from "react";
import { Suspense } from "react";
import { Await, useLoaderData, Link } from "react-router-dom";
import List from "../../components/list/List";
import { AuthContext } from "../../context/AuthContext";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";

function HomePage() {
  const { currentUser } = useContext(AuthContext);
  const data = useLoaderData();

  return (
    <div className="homePage">
      {currentUser && (
        <div className="homePage myListContainer">
          {/* All Posts */}
          <div className="title">
            <h1 className="myListHeading">All Posts</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading posts...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => {
                const allPosts = postResponse?.data || [];
                const savedPosts = postResponse?.data?.savedPosts || [];

                // Mark saved posts in allPosts
                const allPostsWithSaveStatus = allPosts.map((post) => ({
                  ...post,
                  isSaved: savedPosts.some((saved) => saved.id === post.id),
                }));

                return allPostsWithSaveStatus.length > 0 ? (
                  <List posts={allPostsWithSaveStatus} />
                ) : (
                  <p>No posts available. Start creating the first post!</p>
                );
              }}
            </Await>
          </Suspense>

          {/* Saved Posts */}
        </div>
      )}

      {/* Guest View */}
      {!currentUser && (
        <div className="homePage">
          <div className="textContainer">
            <div className="wrapper">
              <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
              <SearchBar />
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

