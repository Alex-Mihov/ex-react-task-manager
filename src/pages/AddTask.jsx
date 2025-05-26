import { useState, useRef } from 'react'

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

function AddTask() {
    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState('')
    const descriptionRef = useRef()
    const statusRef = useRef()

    const validateTitle = (value) => {
        if (!value.trim()) {
            setTitleError('Il campo nome non può essere vuoto')
            return false
        }

        if ([...value].some(char => symbols.includes(char))) {
            setTitleError('Il campo nome non può contenere simboli speciali')
            return false
        }

        setTitleError('')
        return true
    }

    const handleTitleChange = (e) => {
        const newValue = e.target.value
        setTitle(newValue)
        validateTitle(newValue)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validateTitle(title)) {
            return
        }

    }

    return (
        <div className="add-task-container">
            <h2>Aggiungi Nuovo Task</h2>
            <form onSubmit={handleSubmit} className="add-task-form">
                <div className="form-group">
                    <label htmlFor="title">Nome del task:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        className={titleError ? 'invalid' : ''}
                        required
                    />
                    {titleError && <span className="error-message">{titleError}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descrizione:</label>
                    <textarea
                        id="description"
                        ref={descriptionRef}
                        rows="4"
                    />
                </div>

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