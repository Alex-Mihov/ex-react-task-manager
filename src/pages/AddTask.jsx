import { useState, useRef } from 'react'


function AddTask() {
    const [title, setTitle] = useState('')
    const descriptionRef = useRef()
    const statusRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()

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
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
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