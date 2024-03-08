// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
import {Link} from "react-router-dom"

function NavBar() {
  return (
    <div className="nav-container" >
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link to="/">About</Link>
      </li>

      <li className="nav-item">
      <Link to="/portfolio">Portfolio</Link>
      </li>

      <li className="nav-item">
      <Link to="/contact">Contact</Link>
      </li>

      <li className="nav-item">
      <Link to="/resume">Resume</Link>
      </li>
    </ul>
    </div>
  );
}

export default NavBar;