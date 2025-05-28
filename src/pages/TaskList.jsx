import { useContext, useMemo, useState } from 'react'
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
        // Creo una copia dell'array per non modificare l'originale
        return [...tasks].sort((a, b) => {
            let comparison

            // Logica di ordinamento per titolo
            if (sortBy === "title") {
                // Uso localeCompare per confrontare stringhe
                comparison = a.title.localeCompare(b.title)
            }
            // Logica di ordinamento per stato
            else if (sortBy === "status") {
                // Definisco l'ordine degli stati
                const statusOptions = ["To do", "Doing", "Done"]
                // Trovo l'indice di ciascuno stato nell'array di opzioni
                const indexA = statusOptions.indexOf(a.status)
                const indexb = statusOptions.indexOf(b.status)
                // Confronto gli indici
                comparison = indexA - indexb
            }
            // Logica di ordinamento per data di creazione
            else if (sortBy === "createdAt") {
                // Converto le date in timestamp per confrontarle
                const dateA = new Date(a.createdAt).getTime()
                const dateB = new Date(b.createdAt).getTime()
                comparison = dateA - dateB
            }

            // Moltiplico per sortOrder per invertire l'ordinamento se necessario
            return comparison * sortOrder
        })
    }, [tasks, sortBy, sortOrder]) // Ricalcola solo se questi valori cambiano


    // Gestione dello stato di caricamento
    if (!tasks) {
        return <div>Caricamento...</div>
    }

    // Rendering della tabella dei task
    return (
        <div className="task-list-container">
            <h2>Elenco Task</h2>
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
