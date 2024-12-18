// import './list.scss'
// import Card from"../card/Card"


// function List({posts}){
//   return (
//     <div className='list'>
//       {posts.map(item=>(
//         <Card key={item.id} item={item}/>
//       ))}
//     </div>
//   )
// }

// export default List
import './list.scss';
import Card from "../card/Card";

function List({ posts }) {
  console.log("No posts available");
  return (
    <div className='list'>
      {posts && posts.length > 0 ? (
        posts.map(item => (
          <Card key={item.id} item={item} />
        ))
      ) : (
        <p>No properties are available.</p>
      )}
    </div>
  );
}

export default List;
