// Importazione di NavLink da react-router-dom per la navigazione
import { NavLink } from 'react-router-dom'

// Componente della barra di navigazione
function Navbar() {
    return (
        // Container principale della navbar
        <nav className="navbar">
            {/* Lista non ordinata per i link di navigazione */}
            <ul>
                {/* Elemento per la pagina Lista Task */}
                <li>
                    <NavLink
                        to="/"  // Route per la home page
                        // Funzione che aggiunge la classe 'active' al link attivo
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        Lista Task
                    </NavLink>
                </li>
                {/* Elemento per la pagina Aggiungi Task */}
                <li>
                    <NavLink
                        to="/add"  // Route per la pagina di aggiunta task
                        // Funzione che aggiunge la classe 'active' al link attivo
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