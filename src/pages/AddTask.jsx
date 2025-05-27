import { useState, useRef, useContext, useMemo } from 'react'
import { GlobalContext } from '../GlobalContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Componente per l'aggiunta di nuovi task
function AddTask() {
    // Stati e riferimenti
    const [inputTitle, setInputTitle] = useState('')      // Stato per il titolo del task
    const descriptionRef = useRef()                       // Ref per il campo descrizione
    const statusRef = useRef()                           // Ref per il campo stato

    // Accesso alla funzione addTask dal contesto globale
    const { addTask } = useContext(GlobalContext)

    // Validazione del titolo - Memorizzata con useMemo per ottimizzare le performance
    const errorHandler = useMemo(() => {
        const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~"
        // Verifica se il titolo contiene caratteri speciali
        const isIncludes = inputTitle.split('').some(letter => symbols.includes(letter))
        if (isIncludes) return 'Il nome deve includere solo caratteri alfanumerici'
        if (!inputTitle.trim()) return 'Il campo non può essere vuoto'
    }, [inputTitle]) // Si aggiorna solo quando cambia inputTitle

    // Gestisce i cambiamenti nel campo del titolo
    const handleTitleChange = (e) => {
        const newValue = e.target.value
        setInputTitle(newValue)
    }

    // Gestisce l'invio del form
    const handleSubmit = async (e) => {
        e.preventDefault()
        // Se ci sono errori di validazione, interrompe l'invio
        if (errorHandler) {
            return
        }

        // Crea l'oggetto task con i valori del form
        const newTask = {
            title: inputTitle.trim(),
            description: descriptionRef.current.value,
            status: statusRef.current.value
        }

        try {
            // Tenta di creare il nuovo task
            await addTask(newTask)

            // Mostra notifica di successo
            toast.success('Task creata con successo!')

            // Reset del form
            setInputTitle('')
            descriptionRef.current.value = ''
            statusRef.current.value = 'To do'

        } catch (error) {
            // Mostra notifica di errore
            toast.error(`Errore: ${error.message}`)
        }
    }

    return (
        <div className="add-task-container">
            <h2>Aggiungi Nuovo Task</h2>
            <form onSubmit={handleSubmit} className="add-task-form">
                {/* Campo per il titolo con validazione */}
                <div className="form-group">
                    <label htmlFor="title">Nome del task:</label>
                    <input
                        type="text"
                        id="title"
                        value={inputTitle}
                        onChange={handleTitleChange}
                        className={errorHandler ? 'invalid' : ''}
                        required
                    />
                    {/* Messaggio di errore per la validazione */}
                    {errorHandler && <span className="error-message">{errorHandler}</span>}
                </div>

                {/* Campo per la descrizione */}
                <div className="form-group">
                    <label htmlFor="description">Descrizione:</label>
                    <textarea
                        id="description"
                        ref={descriptionRef}
                        rows="4"
                    />
                </div>

                {/* Selezione dello stato */}
                <div className="form-group">
                    <label htmlFor="status">Stato:</label>
                    <select
                        id="status"
                        ref={statusRef}
                        defaultValue="To do"
                    >
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <button type="submit">Aggiungi Task</button>
            </form>
        </div>
    )
}

export default AddTask