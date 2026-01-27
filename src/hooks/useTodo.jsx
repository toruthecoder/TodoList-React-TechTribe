import { useEffect, useState, useMemo } from "react";
import { TodoContext } from "../context/todoContext";
import api from '../lib/axios.js'


export const TodoProvider = ({ children }) => {

    const [todos, setTodos] = useState([])
    const [filtered, setfiltered] = useState('all')
    const [sortBy, setSortBy] = useState('Sort')

    // get Local Todos from the backend
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await api.get("/todos")
                const mapTodos = res.data.map((todo) => ({
                    id: todo._id,
                    title: todo.title,
                    content: todo.content || '',
                    completed: false,
                    lastCreated: new Date(todo.createdAt).getTime(),
                    lastEdit: new Date(todo.updatedAt).getTime() || null,
                }))
                setTodos(mapTodos)
            } catch (error) {
                console.error(`Error Fetching the todos`, error)
            }
        }
        fetchTodos()
    }, [])


    // Filter & Sort 
    const FS = useMemo(() => {
        // First clone the array/todos
        let result = [...todos]

        // For Filter
        if (filtered === 'complete') return result = result.filter((todo) => todo.completed)
        if (filtered === 'incomplete') return result = result.filter(todo => !todo.completed)

        // For sort
        switch (sortBy) {
            case 'alphabet':
                result = [...result].sort((a, b) => a.title.localeCompare(b.title))
                break;
            case 'last-edited':
                result = [...result].sort((a, b) => b.lastEdit - a.lastEdit)
                break;
            case 'recently-created':
                result = [...result].sort((a, b) => b.lastCreated - a.lastCreated)
                break;
            default:
                break;
        }
        return result
    }, [todos, filtered, sortBy])

    // Add/Create Todo 
    const addTodo = (todo) => {
        // setting up the create of todos by using setTodos keeping track of every item by using special id and setting text and checked state
        setTodos(previous => [
            todo, ...previous
        ])
    }

    // Delete Todo
    const deleteTodo = (id) => {
        // checking if the set todos dont match the todo id then delete the todo
        setTodos(prev => prev.filter(todo => todo.id !== id))
    }

    // Edit/Update Todo
    const editTodo = (id, newText) => {
        // checking if the clicked text match the special id or not if it does change the text
        setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, title: newText, lastEdit: Date.now() } : todo))
    }

    // toggle Todos
    const toggleTodos = (id) => {
        // setting up the toggle todo when click on filter 
        setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    }

    // Edit Todo Description
    const editTodoDesc = (id, newDesc) => {
        setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, content: newDesc, lastEdit: Date.now() } : todo))
    }

    const value = {
        todos: FS,
        addTodo,
        editTodoDesc,
        editTodo,
        deleteTodo,
        toggleTodos,
        setfiltered,
        setSortBy
    }

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}
