
import { Link } from "react-router-dom";
import "./card.scss";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function Card({ item }) {
  const [saved, setSaved] = useState(() => {
    // Check if the post is saved in localStorage on page load
    const savedPosts = JSON.parse(localStorage.getItem("savedPosts")) || [];
    return savedPosts.includes(item.id);
  });

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Sync saved state to localStorage
    const savedPosts = JSON.parse(localStorage.getItem("savedPosts")) || [];
    if (saved) {
      // If saved, add post ID to savedPosts
      if (!savedPosts.includes(item.id)) {
        savedPosts.push(item.id);
        localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
      }
    } else {
      // If unsaved, remove post ID from savedPosts
      const updatedSavedPosts = savedPosts.filter((id) => id !== item.id);
      localStorage.setItem("savedPosts", JSON.stringify(updatedSavedPosts));
    }
  }, [saved, item.id]);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setSaved((prev) => !prev); // Optimistic UI update
    try {
      await apiRequest.post("/users/save", { postId: item.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev); // Revert on error
    }
  };

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img className="image" src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="buttons">
            <Link to="/chatPage">
            <button>
              <img src="/chat.png" alt="" />
            </button>
            </Link>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white", // Change save button background
              }}
            >
              <img src="/save.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
