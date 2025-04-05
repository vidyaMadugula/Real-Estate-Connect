// import "./profileUpdatePage.scss";
// import { AuthContext } from "../../context/AuthContext";
// import { useContext, useState } from "react";
// import apiRequest from "../../lib/apiRequest";
// import {useNavigate} from "react-router-dom";
// import UploadWidget from "../../components/uploadWidget/UploadWidget";

// function ProfileUpdatePage() {

//   const [error,setError]=useState("");
//   const {currentUser,updateUser}=useContext(AuthContext);
//   const [avatar,setAvatar]=useState([]);

//   const navigate=useNavigate()

//   const handleSubmit = async e=>{
//     e.preventDefault()
//     const formData=new FormData(e.target)

//     const {username,email,password}=Object.fromEntries(formData);

//     try{
//       const res =await apiRequest.put(`/users/${currentUser.id}`,{
//       username,
//       email,
//       password,
//       avatar:avatar[0],
//     });
//     updateUser(res.data);
//     navigate("/profile");
//     }catch(err){
//       console.log(err);
//       setError(err.response.data.message);
//     }
//   }

//   return (
//     <div className="profileUpdatePage">
//       <div className="formContainer">
//         <form onSubmit={handleSubmit}>
//           <h1>Update Profile</h1>
//           <div className="item">
//             <label htmlFor="username">Username</label>
//             <input
//               id="username"
//               name="username"
//               type="text"
//               defaultValue={currentUser.username}
//             />
//           </div>
//           <div className="item">
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               defaultValue={currentUser.email}
//             />
//           </div>
//           <div className="item">
//             <label htmlFor="password">Password</label>
//             <input id="password" name="password" type="password" />
//           </div>
//           <div className="sideContainer">
//         <img src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} alt="" className="avatar" />
//         <UploadWidget uwConfig={{
//           cloudName:"dgy2fxzcs",
//           uploadPreset:"estate",
//           multiple:false,
//           maxImageFileSize:2000000,
//           folder:"avatars",
//         }}
//         setState={setAvatar}
//           />
//       </div>
          
//           <button className="btn">Update</button>
//           {error && <span>error</span>}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ProfileUpdatePage;

import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const [error, setError] = useState("");
  const { currentUser, updateUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState([currentUser.avatar || ""]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const updatedData = {
        username,
        email,
        password: password || undefined, // Don't send if empty
        avatar: avatar[0] || currentUser.avatar, // Use new avatar if changed
      };

      const res = await apiRequest.put(`/users/${currentUser.id}`, updatedData);
      updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar([""]); // ❗ Ensures removal
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Leave blank to keep current password" />
          </div>

          <div className="sideContainer">
            <img
              src={avatar[0] || "/noavatar.jpg"}
              alt="Profile Avatar"
              className="avatar"
            />
            <UploadWidget
              uwConfig={{
                cloudName: "dgy2fxzcs",
                uploadPreset: "estate",
                multiple: false,
                maxImageFileSize: 2000000,
                folder: "avatars",
              }}
              setState={setAvatar}
            />
            {avatar[0] && (
              <button type="button" className="removeAvatar" onClick={handleRemoveAvatar}>
                Remove Photo
              </button>
            )}
          </div>

          <button className="btn">Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
