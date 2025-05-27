import { useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../GlobalContext'
import { toast } from 'react-toastify'
import Modal from '../components/Modal'
import EditTaskModal from '../components/EditTaskModal'

export default function TaskDetail() {
    // Gestione dello stato per i modal
    const [showModal, setShowModal] = useState(false)         // Modal di conferma eliminazione
    const [showEditModal, setShowEditModal] = useState(false) // Modal di modifica

    // Ottiene l'ID del task dalla URL
    const { id } = useParams()
    // Hook per la navigazione
    const navigate = useNavigate()
    // Ottiene le funzioni e i dati dal contesto globale
    const { tasks, removeTask, updateTask } = useContext(GlobalContext)

    // Trova il task specifico usando l'ID
    const task = tasks.find(t => t.id === parseInt(id))

    // Se il task non viene trovato, mostra un messaggio
    if (!task) {
        return <div>Task non trovato</div>
    }

    // Gestisce l'eliminazione del task
    const handleDelete = async () => {
        try {
            await removeTask(task.id)
            toast.success('Task eliminato con successo')
            navigate('/') // Torna alla home dopo l'eliminazione
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Gestisce l'aggiornamento del task
    const handleUpdate = async (updatedTask) => {
        try {
            console.log('Dati aggiornamento:', { id: task.id, dati: updatedTask })
            await updateTask(task.id, updatedTask)
            toast.success('Task modificato con successo')
            setShowEditModal(false) // Chiude il modal dopo l'aggiornamento
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="task-detail">
            <h2>Dettaglio Task</h2>
            <div className="task-info">
                {/* Visualizzazione delle informazioni del task */}
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

                {/* Pulsanti per le azioni sul task */}
                <div className="task-actions">
                    <button
                        onClick={() => setShowEditModal(true)}
                        className="edit-button"
                    >
                        Modifica Task
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="delete-button"
                    >
                        Elimina Task
                    </button>
                </div>
            </div>

            {/* Modal per la modifica del task */}
            <EditTaskModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                task={task}
                onSave={handleUpdate}
            />

            {/* Modal per la conferma dell'eliminazione */}
            <Modal
                title="Conferma eliminazione"
                content={`Sei sicuro di voler eliminare il task "${task.title}"?`}
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={() => {
                    handleDelete()
                    setShowModal(false)
                }}
                confirmText="Elimina"
            />
        </div>
    )
}
