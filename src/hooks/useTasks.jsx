import { useState, useEffect } from 'react'

export function useTasks(url) {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()
                setTasks(data)
                console.log(data);

            } catch (error) {
                console.error('Error fetching tasks:', error)
            }
        }

        fetchTasks()
    }, [])

    const addTask = async (task) => {

    }

    const removeTask = async (taskId) => {

    }

    const updateTask = async (taskId, updatedTask) => {

    }


    return {
        tasks,
        setTasks,
        addTask,
        removeTask,
        updateTask
    }
}