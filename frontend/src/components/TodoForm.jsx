import React, { useEffect, useState } from 'react'
import axios from 'axios'


const TodoForm = ({ setTodos, fetchData }) => {

    const [newTodo, setNewTodo] = useState({
        'body': ''
    })

    const handleChange = (e) => {
        setNewTodo(prev => ({
            ...prev,
            'body': e.target.value
        }))
    }

    const postTodo = async () => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/todo/`, newTodo)
            setNewTodo({ 'body': '' })
            setTodos(prevTodos => [...prevTodos, newTodo])
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }

    // const handleKeyDown = (e) => {
    //     if (e.key === 'Enter') {
    //         postTodo();
    //     }
    // }



    return (
        <>
            <input
            type="text"
            placeholder="Add Todo"
            value={newTodo.body}
            className="input input-bordered input-info w-full max-w-xs"
            style={{
                backgroundColor: '#f2f2f2',
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '16px',
                outline: 'none',
            }}
            onChange={handleChange}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                postTodo();
                }
            }}
            />
            <button onClick={postTodo} className="bg-sky-500 p-2 rounded text-white ml-3">Add todo</button>
        </>
    )
}

export default TodoForm