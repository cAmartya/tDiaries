import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useDispatch } from 'react-redux'

export default function NavBar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const logout = () => {
    dispatch({ type: 'LOGOUT'})
    // localStorage.removeItem('profile');
    navigate("/auth", {replace: true});
    setUser(null);
  }
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect(() => {
    // const token = user?.token;    
    // JWT
    setUser(JSON.parse(localStorage.getItem('profile')));
    // console.log("in NAVBAR", token);

  }, [location])
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/posts">{props.title}</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${useLocation().pathname === "/posts"?"active" : ""}`} aria-current="page" to="/posts">Explore</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${useLocation().pathname === "/addpost"?"active" : ""}`} to="/addpost">Add Post</Link>
          </li>        
          <li className="nav-item">
            <Link className={`nav-link ${useLocation().pathname === "/about"?"active" : ""}`} to="/about">{props.about}</Link>
          </li>        
          <li className="nav-item">
            <Link className={`nav-link ${useLocation().pathname === "/contacts"?"active" : ""}`} to="/contacts">{props.contact}</Link>
          </li>        
        </ul>

        {!localStorage.getItem("profile")?<>
        <Link className="btn btn-outline-success mx-1" role="button" to= "/auth" >Login / SignUp</Link>
        </> : <button className="btn btn-outline-success mx-1" onClick={logout}> {`${user?.result?.userName} : Log out`}</button>}
        
      </div>
    </div>
  </nav>
  )
}

NavBar.propTypes = {
    title: PropTypes.string.isRequired,
    about: PropTypes.string,
    contact: PropTypes.string
  };

NavBar.defaultProps = {
    title: "iForGot",
    about: "About Us",
    contact: "Contact Us"
  };