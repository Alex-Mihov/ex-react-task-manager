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
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task)
            })

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.message)
            }

            setTasks(prevTasks => [...prevTasks, data.task])
            return data.task

        } catch (error) {
            console.error('Error adding task:', error)
            throw error
        }
    }

    const removeTask = async (taskId) => {
        try {
            const response = await fetch(`${url}/${taskId}`, {
                method: 'DELETE',
            })

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.message)
            }


            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))

        } catch (error) {
            throw error
        }
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