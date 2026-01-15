import { createContext, useContext } from "react";

export const TodoContext = createContext(null)

export const useTodos = () => {
    const context = useContext(TodoContext)
    if (!context) {
        throw new Error(`todo Context must be used with in a todoContext Provider`)
    }
    return context
}

