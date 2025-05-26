import { useContext } from 'react'
import { GlobalContext } from '../GlobalContext'
import TaskRow from '../components/TaskRow'


function TaskList() {
    const { tasks } = useContext(GlobalContext)

    if (!tasks) {
        return <div>Caricamento...</div>
    }

    return (
        <div className="task-list-container">
            <h2>Elenco Task</h2>
            <table className="task-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Stato</th>
                        <th>Data di Creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TaskList
