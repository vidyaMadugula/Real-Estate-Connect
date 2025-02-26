

// import "./singlePage.scss";
// import Slider from "../../components/slider/Slider";
// import Map from "../../components/map/Map";
// import DOMPurify from "dompurify";
// import { useNavigate, useLoaderData } from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import apiRequest from "../../lib/apiRequest";
// import axios from "../../lib/apiRequest"; // Update this based on your project structure

// const SinglePage = () => {
//   const [ownerDetails, setOwnerDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const post = useLoaderData();
//   const [saved, setSaved] = useState(post.isSaved);
//   const { currentUser } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [isBoxVisible, setIsBoxVisible] = useState(false);
//   const [limitReached, setLimitReached] = useState(false);

//   const [showPayment, setShowPayment] = useState(false);

//   const handleGetOwnerDetails = async () => {
//     if (!post.id) {
//       console.error("Post ID is missing");
//       return;
//     }
//     try {
//       const res = await axios.get(`/posts/getOwnerDetails/${post.id}`, { withCredentials: true });
//       setOwnerDetails(res.data);
//       setLimitReached(false);
//       setIsBoxVisible(true);
//       setError(null);
//     } catch (err) {
//       if (err.response?.status === 403) {
//         setLimitReached(true);
//         setIsBoxVisible(true);
//       }
//       setError(err.response?.data?.message || "Failed to fetch details");
//     }
//   };

//   const handleSubscribe = async () => {
//     setShowPayment(true);
//   };

//   const handlePayment = async () => {
//     try {
//       await axios.post(`/users/subscribe`, {}, { withCredentials: true });
//       alert("Subscription successful! You now have unlimited access.");
//       setLimitReached(false);
//       setIsBoxVisible(false);
//       setShowPayment(false);
//     } catch (err) {
//       alert("Failed to subscribe. Please try again.");
//     }
//   };

//   const closeBox = () => {
//     setIsBoxVisible(false);
//     setShowPayment(false);
//   };
  
//   // const handleGetOwnerDetails = async () => {
//   //   if (!post.id) {
//   //     console.error("Post ID is missing");
//   //     return;
//   //   }
//   //   try {
//   //     const res = await axios.get(`/posts/getOwnerDetails/${post.id}`, { withCredentials: true });
//   //     setOwnerDetails(res.data);
//   //     setLimitReached(false);
//   //     setIsBoxVisible(true);
//   //     setError(null);
//   //   } catch (err) {
//   //     if (err.response?.status === 403) {
//   //       setLimitReached(true);
//   //       setIsBoxVisible(true);
//   //     }
//   //     setError(err.response?.data?.message || "Failed to fetch details");
//   //   }
//   // };

//   // const handleSubscribe = async () => {
//   //   try {
//   //     await axios.post(`/users/subscribe`, {}, { withCredentials: true });
//   //     alert("Subscription successful! You now have unlimited access.");
//   //     setLimitReached(false);
//   //     setIsBoxVisible(false);
//   //   } catch (err) {
//   //     alert("Failed to subscribe. Please try again.");
//   //   }
//   // };

//   // const closeBox = () => {
//   //   setIsBoxVisible(false);
//   // };

//   const handleSave = async () => {
//     if (!currentUser) {
//       navigate("/login");
//       return;
//     }
//     setSaved((prev) => !prev);
//     try {
//       await apiRequest.post("/users/save", { postId: post.id });
//     } catch (err) {
//       console.log(err);
//       setSaved((prev) => !prev);
//     }
//   };

//   const handleChat = async () => {
//     // if (!currentUser) {
//     //   navigate("/login");
//     //   return;
//     // }

//     try {
//       const res = await apiRequest.post("/chats", {
//         receiverId: post.userId, // Owner of the post
//       });

//       // Navigate to the chat page with the chat ID
//       navigate(`/chatPage/${res.data.id}`);
//     } catch (err) {
//       console.log("Error creating chat:", err);
//     }
//   };

//   const isOwner = currentUser && currentUser.id === post.userId;

//   return (
//     <div className="singlePage">
//       <div className="details">
//         <div className="wrapper">
//           <Slider images={post.images} />
//           <div className="info">
//             <div className="top">
//               <h1>{post.title}</h1>
//               <div className="div">
//                 <div className="user">
//                   <img src={post.user.avatar} alt="" />
//                   <span>{post.user.username}</span>
//                 </div>
//                 <div className="post">
//                   <div className="address">
//                     <img src="/pin.png" alt="" />
//                     <span>{post.address}</span>
//                   </div>
//                   <div className="price"> &#8377; {post.price}</div>
//                 </div>
//               </div>
//             </div>
//             <div
//               className="bottom"
//               dangerouslySetInnerHTML={{
//                 __html: DOMPurify.sanitize(post.postDetail.desc),
//               }}
//             ></div>
//           </div>
//         </div>
//       </div>
//       <div className="features">
//         <div className="wrapper">
//           <p className="title">General</p>
//           <div className="listVertical">
//             <div className="feature">
//               <img src="/utility.png" alt="" />
//               <div className="featureText">
//                 <span>Utilities</span>
//                 <p>{post.postDetail.utilities === "owner" ? "Owner is responsible" : "Tenant is responsible"}</p>
//               </div>
//             </div>
//             <div className="feature">
//               <img src="/pet.png" alt="" />
//               <div className="featureText">
//                 <span>Pet Policy</span>
//                 <p>{post.postDetail.pet === "allowed" ? "Pets Allowed" : "Pets not Allowed"}</p>
//               </div>
//             </div>
//             <div className="feature">
//               <img src="/fee.png" alt="" />
//               <div className="featureText">
//                 <span>Income Policy</span>
//                 <p>{post.postDetail.income}</p>
//               </div>
//             </div>
//           </div>
//           <p className="title">Sizes</p>
//           <div className="sizes">
//             <div className="size">
//               <img src="/size.png" alt="" />
//               <span>{post.postDetail.size} sqft</span>
//             </div>
//             <div className="size">
//               <img src="/bed.png" alt="" />
//               <span>{post.bedroom} beds</span>
//             </div>
//             <div className="size">
//               <img src="/bath.png" alt="" />
//               <span>{post.bathroom} bathroom</span>
//             </div>
//           </div>
//           <p className="title">Location</p>
//           <div className="mapContainer">
//             <Map items={[post]} />
//           </div>
//           {!isOwner && (
//             <div className="buttons">
//               <button onClick={handleChat}>
//                 <img src="/chat.png" alt="" />
//                 Send a Message
//               </button>
//               <button
//                 onClick={handleSave}
//                 style={{ backgroundColor: saved ? "#fece51" : "white" }}
//               >
//                 <img src="/save.png" alt="" />
//                 {saved ? "Place Saved" : "Save the Place"}
//                 </button>           
//       <div className="buttons">
//               {/* <button onClick={handleGetOwnerDetails} className="btn-1">Get Owner Details</button>
//           {isBoxVisible && (
//             <div className="subscription">
//               <div className="subscription-alert">
//                 <button className="close-btn" onClick={closeBox}>×</button>
//                 {limitReached ? (
//                   <>
//                     <p>You have reached the free limit. Subscribe to continue.</p>
//                     <button onClick={handleSubscribe} className="subscribe-btn">Subscribe</button>
//                   </>
//                 ) : (
//                   <div className="owner-info">
//                     <p><strong>Name:</strong> {ownerDetails?.ownerName}</p>
//                     <p><strong>Phone:</strong> {ownerDetails?.phone}</p>
//                     <p><strong>Address:</strong> {ownerDetails?.address}</p>
//                   </div>
//                 )} 
//               </div>
//             </div>
//           )}*/}
//            <button onClick={handleGetOwnerDetails} className="btn-1">Get Owner Details</button>
//           {isBoxVisible && (
//             <div className="subscription">
//               <div className="subscription-alert">
//                 <button className="close-btn" onClick={closeBox}>×</button>
//                 {limitReached ? (
//                   showPayment ? (
//                     <>
//                       <p>Pay $2 and get access to all owner details</p>
//                       <button onClick={handlePayment} className="pay-btn">Pay $2</button>
//                     </>
//                   ) : (
//                     <>
//                       <p>You have reached the free limit.Subscribe to continue.</p>
//                       <button onClick={handleSubscribe} className="subscribe-btn">Subscribe</button>
//                     </>
//                   )
//                 ) : (
//                   <div className="owner-info">
//                     <p><strong>Name:</strong> {ownerDetails?.ownerName}</p>
//                     <p><strong>Phone:</strong> {ownerDetails?.phone}</p>
//                     <p><strong>Address:</strong> {ownerDetails?.address}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//       </div>
//         </div>    
//         )} 
//         </div>
//       </div>
//     </div>
    
//   );
// }

// export default SinglePage;





// import "./singlePage.scss";
// import Slider from "../../components/slider/Slider";
// import Map from "../../components/map/Map";
// import DOMPurify from "dompurify";
// import { useNavigate, useLoaderData } from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import apiRequest from "../../lib/apiRequest";
// import axios from "../../lib/apiRequest"; // Update this based on your project structure

// const SinglePage = () => {
//   const [ownerDetails, setOwnerDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const post = useLoaderData();
//   const [saved, setSaved] = useState(post.isSaved);
//   const { currentUser } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [isBoxVisible, setIsBoxVisible] = useState(false);
//   const [limitReached, setLimitReached] = useState(false);

//   const [showPayment, setShowPayment] = useState(false);

//   const handleGetOwnerDetails = async () => {
//     if (!post.id) {
//       console.error("Post ID is missing");
//       return;
//     }
//     try {
//       const res = await axios.get(`/posts/getOwnerDetails/${post.id}`, { withCredentials: true });
//       setOwnerDetails(res.data);
//       setLimitReached(false);
//       setIsBoxVisible(true);
//       setError(null);
//     } catch (err) {
//       if (err.response?.status === 403) {
//         setLimitReached(true);
//         setIsBoxVisible(true);
//       }
//       setError(err.response?.data?.message || "Failed to fetch details");
//     }
//   };

//   const handleSubscribe = async () => {
//     setShowPayment(true);
//   };

//   const handlePayment = () => {
//     window.location.href = 'upi://pay?pa=9392221588@axl&pn=RealEstateConnect&mc=1234&tid=123456&tr=order123&tn=Property Payment&am=2&cu=INR';
//   };

//   const closeBox = () => {
//     setIsBoxVisible(false);
//     setShowPayment(false);
//   };

//   const handleSave = async () => {
//     if (!currentUser) {
//       navigate("/login");
//       return;
//     }
//     setSaved((prev) => !prev);
//     try {
//       await apiRequest.post("/users/save", { postId: post.id });
//     } catch (err) {
//       console.log(err);
//       setSaved((prev) => !prev);
//     }
//   };

//   const handleChat = async () => {
//     try {
//       const res = await apiRequest.post("/chats", {
//         receiverId: post.userId, // Owner of the post
//       });

//       // Navigate to the chat page with the chat ID
//       navigate(`/chatPage/${res.data.id}`);
//     } catch (err) {
//       console.log("Error creating chat:", err);
//     }
//   };

//   const isOwner = currentUser && currentUser.id === post.userId;

//   return (
//     <div className="singlePage">
//       <div className="details">
//         <div className="wrapper">
//           <Slider images={post.images} />
//           <div className="info">
//             <div className="top">
//               <h1>{post.title}</h1>
//               <div className="div">
//                 <div className="user">
//                   <img src={post.user.avatar} alt="" />
//                   <span>{post.user.username}</span>
//                 </div>
//                 <div className="post">
//                   <div className="address">
//                     <img src="/pin.png" alt="" />
//                     <span>{post.address}</span>
//                   </div>
//                   <div className="price"> &#8377; {post.price}</div>
//                 </div>
//               </div>
//             </div>
//             <div
//               className="bottom"
//               dangerouslySetInnerHTML={{
//                 __html: DOMPurify.sanitize(post.postDetail.desc),
//               }}
//             ></div>
//           </div>
//         </div>
//       </div>
//       <div className="features">
//         <div className="wrapper">
//           <p className="title">General</p>
//           <div className="listVertical">
//             <div className="feature">
//               <img src="/utility.png" alt="" />
//               <div className="featureText">
//                 <span>Utilities</span>
//                 <p>{post.postDetail.utilities === "owner" ? "Owner is responsible" : "Tenant is responsible"}</p>
//               </div>
//             </div>
//             <div className="feature">
//               <img src="/pet.png" alt="" />
//               <div className="featureText">
//                 <span>Pet Policy</span>
//                 <p>{post.postDetail.pet === "allowed" ? "Pets Allowed" : "Pets not Allowed"}</p>
//               </div>
//             </div>
//             <div className="feature">
//               <img src="/fee.png" alt="" />
//               <div className="featureText">
//                 <span>Income Policy</span>
//                 <p>{post.postDetail.income}</p>
//               </div>
//             </div>
//           </div>
//           <p className="title">Sizes</p>
//           <div className="sizes">
//             <div className="size">
//               <img src="/size.png" alt="" />
//               <span>{post.postDetail.size} sqft</span>
//             </div>
//             <div className="size">
//               <img src="/bed.png" alt="" />
//               <span>{post.bedroom} beds</span>
//             </div>
//             <div className="size">
//               <img src="/bath.png" alt="" />
//               <span>{post.bathroom} bathroom</span>
//             </div>
//           </div>
//           <p className="title">Location</p>
//           <div className="mapContainer">
//             <Map items={[post]} />
//           </div>
//           {!isOwner && (
//             <div className="buttons">
//               <button onClick={handleChat}>
//                 <img src="/chat.png" alt="" />
//                 Send a Message
//               </button>
//               <button
//                 onClick={handleSave}
//                 style={{ backgroundColor: saved ? "#fece51" : "white" }}
//               >
//                 <img src="/save.png" alt="" />
//                 {saved ? "Place Saved" : "Save the Place"}
//               </button>
//               <button onClick={handleGetOwnerDetails} className="btn-1">Get Owner Details</button>
//               {isBoxVisible && (
//                 <div className="subscription">
//                   <div className="subscription-alert">
//                     <button className="close-btn" onClick={closeBox}>×</button>
//                     {limitReached ? (
//                       <>
//                       <p>You have reached free limit.pay $2 and get access to all property owner details</p>
//                       <button onClick={handlePayment} className="pay-btn">Pay ₹2 via UPI</button>
//                       </>
//                     ) : (
//                       <div className="owner-info">
//                         <p><strong>Name:</strong> {ownerDetails?.ownerName}</p>
//                         <p><strong>Phone:</strong> {ownerDetails?.phone}</p>
//                         <p><strong>Address:</strong> {ownerDetails?.address}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SinglePage;


import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import DOMPurify from "dompurify";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import axios from "../../lib/apiRequest"; // Update this based on your project structure

const SinglePage = () => {
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [error, setError] = useState(null);
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isMobile = window.matchMedia("(max-width: 600px)").matches;
  console.log(isMobile);
  const upiLink = "upi://pay?pa=9@axl&pn=RealEstateConnect&mc=1234&tid=123456&tr=order123&tn=Property%20Payment&am=2&cu=INR";

  const handleGetOwnerDetails = async () => {
    if (!post.id) {
      console.error("Post ID is missing");
      return;
    }
    try {
      const res = await axios.get(`/posts/getOwnerDetails/${post.id}`, { withCredentials: true });
      setOwnerDetails(res.data);
      setLimitReached(false);
      setIsBoxVisible(true);
      setError(null);
    } catch (err) {
      if (err.response?.status === 403) {
        setLimitReached(true);
        setIsBoxVisible(true);
      }
      setError(err.response?.data?.message || "Failed to fetch details");
    }
  };

  const handlePayment = () => {
    window.location.href = upiLink;
  };

  const closeBox = () => {
    setIsBoxVisible(false);
  };

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  const handleChat = async () => {
    try {
      const res = await apiRequest.post("/chats", {
        receiverId: post.userId,
      });

      navigate(`/chatPage/${res.data.id}`);
    } catch (err) {
      console.log("Error creating chat:", err);
    }
  };

  const isOwner = currentUser && currentUser.id === post.userId;

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <h1>{post.title}</h1>
              <div className="div">
                <div className="user">
                  <img src={post.user.avatar} alt="" />
                  <span>{post.user.username}</span>
                </div>
                <div className="post">
                  <div className="address">
                    <img src="/pin.png" alt="" />
                    <span>{post.address}</span>
                  </div>
                  <div className="price"> ₹ {post.price}</div>
                </div>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>{post.postDetail.utilities === "owner" ? "Owner is responsible" : "Tenant is responsible"}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>{post.postDetail.pet === "allowed" ? "Pets Allowed" : "Pets not Allowed"}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          {!isOwner && (
            <div className="buttons">
              <button onClick={handleChat}>
                <img src="/chat.png" alt="" />
                Send a Message
              </button>
              <button
                onClick={handleSave}
                style={{ backgroundColor: saved ? "#fece51" : "white" }}
              >
                <img src="/save.png" alt="" />
                {saved ? "Place Saved" : "Save the Place"}
              </button>
              <button onClick={handleGetOwnerDetails} className="btn-1">
                Get Owner Details
              </button>
              {isBoxVisible && (
                <div className="subscription">
                  <div className="subscription-alert">
                    <button className="close-btn" onClick={closeBox}>x</button>
                    {limitReached ? (
                      <>
                        <p>You have reached your free limit. Pay ₹2 to get access to all property owner details.</p>
                        {isMobile ? (
                          <a href={upiLink}>
                            <button className="pay-btn">Pay ₹2 via UPI</button>
                          </a>
                        ) : (
                          // <img
                          //   src={`https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(upiLink)}`}
                          //   alt="Scan QR to Pay"
                          // />
                          <img className="image"
  // src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`}
  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=HelloWorld`}
  alt="Scan QR to Pay"
  style={{ width: "80px", height: "80px", objectFit: "contain" }}
/>

                        )}
                      </>
                    ) : (
                      <div className="owner-info">
                        <p><strong>Name:</strong> {ownerDetails?.ownerName}</p>
                        <p><strong>Phone:</strong> {ownerDetails?.phone}</p>
                        <p><strong>Address:</strong> {ownerDetails?.address}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
