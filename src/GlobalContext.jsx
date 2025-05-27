import { createContext } from 'react'
import { useTasks } from './hooks/useTasks'

// Creazione del contesto globale dell'applicazione
export const GlobalContext = createContext()

// Componente Provider che fornisce il contesto a tutti i componenti figli
export function GlobalProvider({ children }) {
    // Utilizzo del custom hook useTasks per gestire le operazioni CRUD
    // L'URL dell'API viene costruito usando la variabile d'ambiente VITE_API_URL
    const {
        tasks,      // Array dei task
        addTask,    // Funzione per aggiungere un task
        removeTask, // Funzione per rimuovere un task
        updateTask  // Funzione per modificare un task
    } = useTasks(`${import.meta.env.VITE_API_URL}/tasks`)

    // Oggetto che contiene i valori da condividere nel contesto
    const value = {
        tasks,      // Lista dei task disponibili
        addTask,    // Funzione per creare nuovo task
        removeTask, // Funzione per eliminare task
        updateTask  // Funzione per modificare task
    }

    // Rendering del Provider con i valori del contesto
    return (
        <GlobalContext.Provider value={value}>
            {children} {/* Renderizza i componenti figli che avranno accesso al contesto */}
        </GlobalContext.Provider>
    )
}