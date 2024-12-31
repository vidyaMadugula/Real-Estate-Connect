
import './list.scss';
import Card from "../card/Card";

function List({ posts, savedPostIds = [] }) {
  return (
    <div className="list">
      {posts && posts.length > 0 ? (
        posts.map((item) => (
          <Card key={item.id} item={item} isSaved={savedPostIds.includes(item.id)} />
        ))
      ) : (
        <p>No properties are available.</p>
      )}
    </div>
  );
}
export default List;

// list.jsx
// import './list.scss';
// import Card from "../card/Card";

// function List({ posts, savedPostIds = [], showActions = true }) {
//   return (
//     <div className="list">
//       {posts && posts.length > 0 ? (
//         posts.map((item) => (
//           <Card 
//             key={item.id} 
//             item={item} 
//             isSaved={savedPostIds.includes(item.id)} 
//             showActions={showActions} 
//           />
//         ))
//       ) : (
//         <p>No properties are available.</p>
//       )}
//     </div>
//   );
// }

// export default List;


