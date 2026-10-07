import './Header.css'
import { Link, NavLink } from 'react-router-dom'

/**
 * A React component that is used for the header displayed at the top of every page of the site.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Header = props => {
  return (
    <header className="Header-header">
      <nav className="Header-navbar">
        <Link to="/" className="logo" aria-label="Home">
          <span aria-hidden="true">AD</span>
        </Link>
        <ul className="nav-links">
          <li className="nav-item">
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/messages">Messages</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about-us">About Us</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

// make this component available to be imported into any other file
export default Header
