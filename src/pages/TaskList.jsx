import { useContext, useMemo, useState, useCallback } from 'react'
import { GlobalContext } from '../GlobalContext'
import TaskRow from '../components/TaskRow'


// Componente principale che gestisce la lista dei task
function TaskList() {
    // Recupera l'array dei task dal contesto globale
    const { tasks } = useContext(GlobalContext)


    // Stati per gestire l'ordinamento
    // sortBy: campo su cui ordinare (title, status, createdAt)
    // sortOrder: direzione dell'ordinamento (1 = ascendente, -1 = discendente)
    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)
    const [searchQuery, setSearchQuery] = useState("") // Stato per la query di ricerca

    // Icona che indica la direzione dell'ordinamento
    const sortIcon = sortOrder === 1 ? "↓" : "↑"

    // Funzione che gestisce il click sulle intestazioni della tabella
    const handleSort = (field) => {
        // Se clicco sullo stesso campo, inverto solo la direzione
        if (sortBy === field) {
            setSortOrder(prev => prev * -1)
        } else {
            // Se clicco su un campo diverso, imposto il nuovo campo e reset dell'ordine
            setSortBy(field)
            setSortOrder(1)
        }
    }

    // useMemo per memorizzare e ricalcolare la lista ordinata solo quando necessario
    const sortedTasks = useMemo(() => {
        // 1. Filtraggio: filtra i task in base alla query di ricerca (case insensitive)
        const filteredTasks = tasks.filter(task =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // 2. Ordinamento: ordina i task filtrati in base al campo selezionato
        return [...filteredTasks].sort((a, b) => {
            let comparison = 0;

            // Ordinamento per titolo (case insensitive)
            if (sortBy === "title") {
                comparison = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
            }
            // Ordinamento per stato
            else if (sortBy === "status") {
                const statusOrder = ["To do", "Doing", "Done"];
                const indexA = statusOrder.indexOf(a.status);
                const indexB = statusOrder.indexOf(b.status);
                comparison = indexA - indexB;
            }
            // Ordinamento per data di creazione
            else if (sortBy === "createdAt") {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                comparison = dateA - dateB;
            }

            // Applica la direzione dell'ordinamento
            return comparison * sortOrder;
        });
    }, [tasks, sortBy, sortOrder, searchQuery]); // Dipendenze del memo


    // Gestione dello stato di caricamento
    if (!tasks) {
        return <div>Caricamento...</div>
    }

    // Funzione di debounce per la ricerca
    const debouncedSearch = useCallback((value) => {
        clearTimeout(window.searchTimer);
        window.searchTimer = setTimeout(() => {
            setSearchQuery(value);
        }, 300); // Ritardo di 300ms
    }, []); // Nessuna dipendenza perché vogliamo che la funzione rimanga stabile

    // Rendering della tabella dei task
    return (
        <div className="task-list-container">
            <h2>Elenco Task</h2>
            {/* Input di ricerca */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Cerca task..."
                    onChange={(e) => debouncedSearch(e.target.value)}
                    className="search-input"
                />
            </div>
            {/* Tabella per visualizzare i task in modo strutturato */}
            <table className="task-table">
                {/* Intestazione della tabella */}
                <thead>
                    <tr>
                        <th onClick={() => handleSort("title")}>
                            Nome {sortBy === "title" && sortIcon}                        </th>
                        <th onClick={() => handleSort("status")}>
                            Stato {sortBy === "status" && sortIcon}
                        </th>
                        <th onClick={() => handleSort("createdAt")}>
                            Data di Creazione {sortBy === "createdAt" && sortIcon}
                        </th>
                    </tr>
                </thead>
                {/* Corpo della tabella con la lista dei task */}
                <tbody>
                    {/* Itera su ogni task e crea una riga per ciascuno */}
                    {sortedTasks.map(task => (
                        <TaskRow
                            key={task.id}  // Chiave univoca richiesta da React
                            task={task}    // Passa i dati del task al componente riga
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TaskList
