import { useContext, useState } from 'react'
import { GlobalContext } from '../GlobalContext'
import TaskRow from '../components/TaskRow'


// Componente che visualizza la lista di tutti i task in formato tabella
function TaskList() {
    // Ottiene l'array dei task dal contesto globale usando destructuring
    const { tasks } = useContext(GlobalContext)
    console.log(tasks);


    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)


    // Se i task non sono ancora stati caricati, mostra un messaggio di caricamento
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
                        <th onClick={() => sortOrder === 1 ? -1 : 1}>Nome</th>
                        <th>Stato</th>
                        <th>Data di Creazione</th>
                    </tr>
                </thead>
                {/* Corpo della tabella con la lista dei task */}
                <tbody>
                    {/* Itera su ogni task e crea una riga per ciascuno */}
                    {tasks.map(task => (
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
