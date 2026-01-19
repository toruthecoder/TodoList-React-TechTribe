import { useEffect, useState, useMemo } from "react";
import { TodoContext } from "../context/todoContext";

export const TodoProvider = ({ children }) => {

    const [todos, setTodos] = useState(() => {
        const storeTodos = localStorage.getItem('todos')
        const parsedTodos = storeTodos ? JSON.parse(storeTodos) : []
        return parsedTodos;
    })
    const [filtered, setfiltered] = useState('all')
    const [sortBy, setSortBy] = useState('Sort')

    // Set Local Todos
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
        console.log(`This is data from setLocal`, todos)
    }, [todos])

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
                result = result.sort((a, b) => a.text.localeCompare(b.text))
                break;
            case 'last-edited':
                result = result.sort((a, b) => b.lastEdit - a.lastEdit)
                break;
            case 'recently-created':
                result = result.sort((a, b) => b.lastCreated - a.lastCreated)
                break;
            default:
                break;
        }
        return result
    }, [todos, filtered, sortBy])

    // Add/Create Todo 
    const addTodo = (text, desc) => {
        // setting up the create of todos by using setTodos keeping track of every item by using special id and setting text and checked state
        setTodos(previous => [
            ...previous, { id: Date.now(), text, completed: false, lastCreated: Date.now(), desc }
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
        setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, text: newText, lastEdit: Date.now() } : todo))
    }

    // toggle Todos
    const toggleTodos = (id) => {
        // setting up the toggle todo when click on filter 
        setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    }

    // Edit Todo Description
    const editTodoDesc = (id, newDesc) => {
        setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, desc: newDesc, lastEdit: Date.now() } : todo))
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
