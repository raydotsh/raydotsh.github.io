import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">home</Link>
      <Link to="/whoami" className="nav-link">whoami</Link>
      <Link to="/blog" className="nav-link">blog</Link>
      <Link to="/contact" className="nav-link">contact</Link>
    </nav>
  );
}
