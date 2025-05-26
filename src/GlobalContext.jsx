import { createContext } from 'react'
import { useTasks } from './hooks/useTasks'

// Creazione del contesto
export const GlobalContext = createContext()

// Provider component
export function GlobalProvider({ children }) {
    const { tasks, addTask, removeTask, updateTask } = useTasks(`${import.meta.env.VITE_API_URL}/tasks`)

    // Valori da condividere nel contesto
    const value = {
        tasks,
        addTask,
        removeTask,
        updateTask
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}