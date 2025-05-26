import { useState, useRef, useContext, useMemo } from 'react'
import { GlobalContext } from '../GlobalContext'



function AddTask() {
    const [inputTitle, setInputTitle] = useState('')
    const descriptionRef = useRef()
    const statusRef = useRef()

    const { addTask } = useContext(GlobalContext)

    const errorHandler = useMemo(() => {
        const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";
        const isIncludes = inputTitle.split('').some(letter => symbols.includes(letter))
        if (isIncludes) return 'Il nome deve includere solo caratteri alfanumerici'
        if (!inputTitle.trim()) return 'Il campo non può essere vuoto'
    }, [inputTitle])

    const handleTitleChange = (e) => {
        const newValue = e.target.value
        setInputTitle(newValue)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (errorHandler) {
            return
        }

        const newTask = {
            title: inputTitle.trim(),
            description: descriptionRef.current.value,
            status: statusRef.current.value

        }

        console.log('New Task:', newTask)
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
                        value={inputTitle}
                        onChange={handleTitleChange}
                        className={errorHandler ? 'invalid' : ''}
                        required
                    />
                    {errorHandler && <span className="error-message">{errorHandler}</span>}
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