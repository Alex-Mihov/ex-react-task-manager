import { useState, useEffect } from 'react'

// Hook personalizzato che gestisce tutte le operazioni CRUD (Create, Read, Update, Delete) dei task
// Parametro url: endpoint base dell'API per le operazioni sui task
export function useTasks(url) {
    // Inizializza lo stato locale per i task come array vuoto
    const [tasks, setTasks] = useState([])

    // useEffect viene eseguito al mount del componente per caricare i task iniziali
    useEffect(() => {
        // Funzione asincrona per recuperare i task dal server
        const fetchTasks = async () => {
            try {
                // Effettua la chiamata GET all'API
                const response = await fetch(url)
                // Verifica se la risposta è valida
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                // Converte la risposta in JSON
                const data = await response.json()
                // Aggiorna lo stato con i task ricevuti
                setTasks(data)
                console.log(data) // Log per debug

            } catch (error) {
                // Gestione errori durante il caricamento
                console.error('Error fetching tasks:', error)
            }
        }

        // Esegue la funzione di fetch
        fetchTasks()
    }, []) // Array di dipendenze vuoto = esegui solo al mount

    // Funzione per aggiungere un nuovo task
    const addTask = async (task) => {
        try {
            // Effettua la chiamata POST all'API
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Converte l'oggetto task in stringa JSON
                body: JSON.stringify(task)
            })

            const data = await response.json()

            // Verifica il successo dell'operazione
            if (!data.success) {
                throw new Error(data.message)
            }

            // Aggiorna lo stato aggiungendo il nuovo task all'array esistente
            setTasks(prevTasks => [...prevTasks, data.task])
            return data.task

        } catch (error) {
            console.error('Error adding task:', error)
            throw error // Rilancia l'errore per gestirlo nel componente
        }
    }

    // Funzione per eliminare un task esistente
    const removeTask = async (taskId) => {
        try {
            // Effettua la chiamata DELETE all'API
            const response = await fetch(`${url}/${taskId}`, {
                method: 'DELETE',
            })

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.message)
            }

            // Aggiorna lo stato rimuovendo il task con l'ID specificato
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))

        } catch (error) {
            throw error
        }
    }

    // Funzione per modificare un task esistente
    const updateTask = async (taskId, updatedTask) => {
        try {
            // Effettua la chiamata PUT all'API
            const response = await fetch(`${url}/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message);
            }

            // Aggiorna lo stato sostituendo il task modificato
            // Usa map per creare un nuovo array dove il task modificato viene sostituito
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? data.task : task
                )
            );

            return data.task;

        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    }

    // Restituisce un oggetto con lo stato dei task e tutte le funzioni CRUD
    return {
        tasks,       // Array dei task
        setTasks,    // Funzione per modificare direttamente l'array dei task
        addTask,     // Funzione per aggiungere un task
        removeTask,  // Funzione per rimuovere un task
        updateTask   // Funzione per modificare un task
    }
}