import React from 'react'
import { Link } from 'react-router-dom'
import './TaskRow.css'

// Componente che rappresenta una riga nella tabella dei task
// Usa React.memo per ottimizzare le performance evitando render non necessari
// Props:
// - task: oggetto contenente i dati del task da visualizzare
function TaskRow({ task }) {
    // Funzione che determina la classe CSS per il colore dello stato
    // Parametri:
    // - status: stringa che rappresenta lo stato del task
    // Ritorna: stringa con la classe CSS appropriata
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'to do': return 'status-todo'    // Stato: da fare
            case 'doing': return 'status-doing'   // Stato: in corso
            case 'done': return 'status-done'     // Stato: completato
            default: return ''                     // Stato non riconosciuto
        }
    }

    // Rendering della riga della tabella
    return (
        <tr>
            {/* Cella con il titolo del task come link alla pagina di dettaglio */}
            <td>
                <Link to={`/task/${task.id}`} className="task-link">
                    {task.title}
                </Link>
            </td>
            {/* Cella con lo stato del task, con classe CSS dinamica per il colore */}
            <td className={`status-cell ${getStatusColor(task.status)}`}>
                {task.status}
            </td>
            {/* Cella con la data di creazione formattata */}
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    )
}

// Esporta il componente avvolto in React.memo per l'ottimizzazione delle performance
export default React.memo(TaskRow)