import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
    reducerPath: 'todos',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_CLIENT_URL}/api`,
    }),
    endpoints: (builder) => {
        return {
            getTodos: builder.query({
                query: () => `/todos`
            }),

            addTodo: builder.mutation({
                query: (todo) => ({
                    url: '/todos',
                    method: 'POST',
                    body: todo,
                })
            }),

            editTodo: builder.mutation({
                query: (todo) => {
                    const { id, ...body } = todo
                    return {
                        url: `todos/${id}`,
                        method: 'PUT',
                        body,
                    }
                }
            }),

            deleteTodo: builder.mutation({
                query: ({ id }) => ({
                    url: `/todos/${id}`,
                    method: 'DELETE',
                    body: id,
                }),
            }),
        }
    }
})

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useEditTodoMutation,
    useDeleteTodoMutation,
} = todoApi