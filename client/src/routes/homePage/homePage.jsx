
// import { useContext } from "react";
// import { Suspense } from "react";
// import { Await, useLoaderData,Link } from "react-router-dom";
// import List from "../../components/list/List";
// import { AuthContext } from "../../context/AuthContext";
// import SearchBar from "../../components/searchBar/SearchBar";
// import "./homePage.scss";

// function HomePage() {
//   const { currentUser } = useContext(AuthContext);
//   const data = useLoaderData();

//   if (currentUser) {
//     // Logged-in user view
//     return (
//       <div className="homePage myListContainer">
//         <div className="title">
//           <h1 className="myListHeading">My Posts</h1>
//           <Link to="/add">
//           <button>Create New Post</button>
//           </Link>
//         </div>
//       <Suspense fallback={<p>Loading posts...</p>}>
//       <Await
//       resolve={data.postResponse}
//       errorElement={<p>Error loading posts!</p>}
//       >
//       {(postResponse) =>
//         postResponse.data?.userPosts?.length > 0 ? (
//           <List posts={postResponse.data.userPosts} />
//         ) : (
//           <p>No posts available. Start creating your first post!</p>
//         )
//       }
//       </Await>
//       </Suspense>
      // <div className="title">
      //     <h1>Saved Posts</h1>
      //     </div>
      //     <Suspense fallback={<p>Loading...</p>}>
      //       <Await
      //       resolve={data.postResponse}
      //       errorElement={<p>Error loading posts!</p>}
      //       >
      //        {(postResponse) => (<List posts={postResponse.data.savedPosts.map(post => ({ ...post, isSaved: true }))} />)}
      //       </Await>
      //     </Suspense>
      // </div> 
//     );
//   }

//   // Guest view
//   return (
//     <div className="homePage">
//       <div className="textContainer">
//         <div className="wrapper">
//           <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
//           <SearchBar />
//           <div className="boxes"></div>
//         </div>
//       </div>
//       <div className="imgContainer">
//         <img src="/bg.png" alt="" />
//       </div>
//     </div>
//   );
// }

// export default HomePage;

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
              {(postResponse) =>
                postResponse?.data?.length > 0 ? (
                  <List posts={postResponse.data} />
                ) : (
                  <p>No posts available.Start creating  first post!</p>
                )
              }
            </Await>
          </Suspense>
          <div className="title">
          <h1>Saved Posts</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
            >
             {(postResponse) => (<List posts={postResponse.data.savedPosts.map(post => ({ ...post, isSaved: true }))} />)}
            </Await>
          </Suspense>
        </div>
      )}

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
