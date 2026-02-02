import { configureStore } from '@reduxjs/toolkit'
import { todoApi } from './Todos/todoApi.js'

export const store = configureStore({
    reducer: {
        [todoApi.reducerPath]: todoApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(todoApi.middleware)
    }
})