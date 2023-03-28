import React from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
// Using use-location hook to set class active to links in navbar corresponding to the page that we are on.
const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();
    const handleLogout=()=>{
      localStorage.removeItem('token');
      navigate('/login');
    }
  return (
    <nav className="navbar navbar-expand-lg" style={{backgroundColor:"#F2BE22",fontFamily:"Handlee",fontSize:"1.5rem"}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><i className="fa-solid fa-pen-nib" style={{color:"#fff",fontSize:"25px",marginRight:"10px"}}></i>Notely</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"? "active" :""}`} aria-current="page" to="/">Home</Link>
        </li>
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex" role="search">
        <Link className="btn btn-success mx-2" role="button" to="/signup">Sign-Up</Link>
        <Link className="btn btn-dark" role="button" to="/login">Login</Link>
      </form>:<button onClick={handleLogout} className='btn btn-dark'>Logout</button>}
    </div>
  </div>
</nav>
  )
}

export default Navbar
