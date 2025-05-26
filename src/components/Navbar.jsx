import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        Lista Task
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/add"
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        Aggiungi Task
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar