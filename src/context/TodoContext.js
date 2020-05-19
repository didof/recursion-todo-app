import React, { createContext, useReducer } from 'react'

import TodoReducer from './TodoReducer'

import initialState from './dummyData'

export const TodoContext = createContext()

function TodoContextProvider({ children }) {
	const [state, dispatch] = useReducer(TodoReducer, initialState)

	return (
		<TodoContext.Provider value={{ state, dispatch }}>
			{children}
		</TodoContext.Provider>
	)
}

export default TodoContextProvider



