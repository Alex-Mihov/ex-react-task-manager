import { createContext, useState, useEffect } from 'react'

// Creazione del contesto
export const GlobalContext = createContext()

// Provider component
export function GlobalProvider({ children }) {
    // State per memorizzare la lista dei task
    const [tasks, setTasks] = useState([])

    // Fetch iniziale dei task
    useEffect(() => {
        console.log('Effect is running')
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`)

                if (!response.ok) {
                    throw new Error(`Errore HTTP: ${response.status}`)
                }

                const data = await response.json()
                console.log('Task ricevuti:', data)
                setTasks(data)
            } catch (error) {
                console.error('Errore nel recupero dei task:', error)
            }
        }

        fetchTasks()
    }, [])

    // Valori da condividere nel contesto
    const value = {
        tasks,
        setTasks
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}