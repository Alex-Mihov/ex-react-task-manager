import React from 'react'
import { Link } from 'react-router-dom'
import './TaskRow.css'


function TaskRow({ task }) {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'to do': return 'status-todo'
            case 'doing': return 'status-doing'
            case 'done': return 'status-done'
            default: return ''
        }
    }

    return (
        <tr>
            <td>
                <Link to={`/task/${task.id}`} className="task-link">
                    {task.title}
                </Link>
            </td>
            <td className={`status-cell ${getStatusColor(task.status)}`}>
                {task.status}
            </td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    )
}

export default React.memo(TaskRow)