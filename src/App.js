import React from 'react'

import Layout from './components/UI/Layout'
import TodoList from './components/TodoList/TodoList'
import NewTodoForm from './components/NewTodoForm/NewTodoForm'

import TodoContextProvider from './context/TodoContext'

function App() {
	return (
		<TodoContextProvider>
			<Layout>
				<div className='columns'>
					<div className='column'>
						<NewTodoForm />
					</div>
					<div className='column'>
						<TodoList />
					</div>
				</div>
			</Layout>
		</TodoContextProvider>
	)
}

export default App
