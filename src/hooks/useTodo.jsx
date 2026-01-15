import { useEffect, useState } from "react";
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

    // Add/Create Todo 
    const addTodo = (text) => {
        // setting up the create of todos by using setTodos keeping track of every item by using special id and setting text and checked state
        setTodos(previous => [
            ...previous, { id: Date.now(), text, completed: false, lastCreated: Date.now(), lastEdit: Date.now() }
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

    // Filter Todo
    const filterdTodos = todos.filter(todo => {
        if (filtered === 'complete') return todo.completed
        if (filtered === 'incomplete') return !todo.completed
        return true
    })

    // Sort todo
    // const sortTodos = todos.sort((a, b) => {
    //     if (sortBy === 'alphabet') return a.text.localeCompare(b.text);
    //     if (sortBy === 'last-edited') return b.lastEdit - a.lastEdit;
    //     if (sortBy === 'recently-created') return b.lastCreated - a.lastCreated;
    //     return 0;
    // });
    const value = {
        todos: filterdTodos,
        addTodo,
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