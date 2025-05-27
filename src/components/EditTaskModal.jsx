import { useState, useRef, useEffect } from 'react'
import Modal from './Modal'

// Componente per la modifica di un task esistente
// Props:
// - show: booleano che controlla la visibilità del modal
// - onClose: funzione chiamata alla chiusura del modal
// - task: oggetto contenente i dati del task da modificare
// - onSave: funzione chiamata al salvataggio delle modifiche
function EditTaskModal({ show, onClose, task, onSave }) {
    // Stati locali per i campi del form
    const [title, setTitle] = useState('')           // Titolo del task
    const [description, setDescription] = useState('') // Descrizione del task
    const [status, setStatus] = useState('To do')     // Stato del task
    const editFormRef = useRef(null)                  // Riferimento al form per il submit

    // Effect per inizializzare i campi quando viene passato un task
    useEffect(() => {
        if (task) {
            setTitle(task.title)
            setDescription(task.description || '')  // Se description è undefined, usa stringa vuota
            setStatus(task.status)
        }
    }, [task]) // Si attiva quando cambia il task

    // Gestione del submit del form
    const handleSubmit = (e) => {
        e.preventDefault() // Previene il comportamento di default del form

        // Crea un nuovo oggetto task con i valori aggiornati
        const updatedTask = {
            ...task,              // Mantiene le proprietà esistenti
            title: title.trim(),  // Rimuove spazi iniziali e finali
            description: description,
            status
        }

        onSave(updatedTask) // Chiama la funzione di salvataggio passata come prop
    }

    // Definizione del contenuto del modal
    const modalContent = (
        <form ref={editFormRef} onSubmit={handleSubmit}>
            {/* Campo per il titolo del task */}
            <div className="form-group">
                <label>
                    Nome:
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
            </div>

            {/* Campo per la descrizione del task */}
            <div className="form-group">
                <label>
                    Descrizione:
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                    />
                </label>
            </div>

            {/* Selezione dello stato del task */}
            <div className="form-group">
                <label>
                    Stato:
                    <select
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </label>
            </div>
        </form>
    )

    // Rendering del componente Modal con il form
    return (
        <Modal
            title="Modifica Task"
            content={modalContent}
            show={show}
            onClose={onClose}
            onConfirm={() => editFormRef.current.requestSubmit()} // Trigger del submit del form
            confirmText="Salva"
        />
    )
}

export default EditTaskModal