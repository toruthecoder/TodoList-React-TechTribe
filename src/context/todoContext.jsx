import { createContext, useContext, useState, useEffect } from "react";

const TodoContext = createContext(null)

export const useTodos = () => {
    const context = useContext(TodoContext)
    if (!context) {
        throw new Error(`todo Context must be used with in a todoContext Provider`)
    }
    return context
}

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([])
    const [filtered, setfiltered] = useState('all')

    // Get Local Todos
    useEffect(() => {
        const storeTodos = JSON.parse(localStorage.getItem('todos') || '[]')
        if (storeTodos) {
            setTodos(storeTodos)
        }
        console.log(`This is data from getLocal`, storeTodos)
    }, [])

    // Set Local Todos
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
        console.log(`This is data from setLocal`, todos)
    }, [todos])


    // const storedTodos = (todos) => {
    //     if (todos.length === 0) {
    //         localStorage.removeItem('todos')
    //     } else {
    //         localStorage.setItem('todos', JSON.stringify(todos))
    //         setTodos(todos)
    //     }
    // }

    // Add/Create Todo 
    const addTodo = (text) => {
        // setting up the create of todos by using setTodos keeping track of every item by using special id and setting text and checked state
        setTodos(previous => [
            ...previous, { id: Date.now(), text, completed: false }
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
        setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, text: newText } : todo))
    }

    // toggle Todos
    const toggleTodos = (id) => {
        // setting up the toggle todo when click on filter 
        setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    }

    // Filter Todo
    const filterdTodos = todos.filter(todo => {
        if (filtered === 'complete') return todo.completed
        if (filtered === 'incomplete') return !todo.completed
        return true
    })

    const value = {
        todos: filterdTodos,
        addTodo,
        editTodo,
        deleteTodo,
        toggleTodos,
        setfiltered
    }

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}