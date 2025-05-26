import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../GlobalContext'

export default function TaskDetail() {
    const { id } = useParams()
    const { tasks } = useContext(GlobalContext)

    const task = tasks.find(t => t.id === parseInt(id))

    if (!task) {
        return <div>Task non trovato</div>
    }

    const handleDelete = () => {
        console.log('Elimino task:', task.id)
    }

    return (
        <div className="task-detail">
            <h2>Dettaglio Task</h2>
            <div className="task-info">
                <h3>Nome</h3>
                <p>{task.title}</p>

                <h3>Descrizione</h3>
                <p>{task.description}</p>

                <h3>Stato</h3>
                <p className={`status ${task.status.toLowerCase().replace(' ', '-')}`}>
                    {task.status}
                </p>

                <h3>Data di creazione</h3>
                <p>{new Date(task.createdAt).toLocaleDateString()}</p>

                <button
                    onClick={handleDelete}
                    className="delete-button"
                >
                    Elimina Task
                </button>
            </div>
        </div>
    )
}
