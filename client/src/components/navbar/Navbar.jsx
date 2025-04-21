import { useState ,useContext,useEffect} from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";



function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);
  // const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      fetch();
    }
  }, [currentUser, fetch]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  const isHomePage = location.pathname === '/';
  const isChatPage = location.pathname === '/chatPage';
  const isProfilePage = location.pathname === '/profile';

  return (
    <nav>
      <div className="left">
        {/* Conditionally render "Home" link beside the logo for Desktop view */}
        <a  className="logo">
          <img src="/logo.png" alt="Logo" />
          <span>RealEstate</span>
        </a>
        
          <a href="/" className="homeLink">
            Home
          </a>
      
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <Link to="/profile">
              <img src={currentUser.avatar || '/noavatar.jpg'} alt="User" />
            </Link>
            <span>{currentUser.username || 'User'}</span>
           
              <Link to="/chatPage" className="profileButton">
                {number > 0 && <div className="notification">{number}</div>}
                <span>Chats</span>
              </Link>
            
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt="Menu Icon"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? 'menu active' : 'menu'}>
        {currentUser && (
          <>
          <a href="/">Home</a>
          <Link to="/profile">Profile</Link>
          <a href="/chatPage">Chats</a>
          </>
        )}
          
          {/* {!isProfilePage && currentUser && <Link to="/profile">Profile</Link>}
          {!isChatPage && !isHomePage &&<a href="/chatPage">Chat</a>} */}
          {!currentUser && (
            <>
              <a href="/login">Sign in</a>
              <a href="/register">Sign up</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


