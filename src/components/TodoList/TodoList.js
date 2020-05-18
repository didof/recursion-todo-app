import React, { useContext } from 'react'

import { TodoContext } from '../../context/TodoContext'

import TodoElement from '../TodoElement/TodoElement'

function TodoListContainer() {
	const {
		state: { data },
	} = useContext(TodoContext)

	return (
		<nav className='panel'>
			<p className='panel-heading'>Todos</p>
			<div className='panel-block'>
				<p className='control has-icons-left'>
					<input className='input' type='text' placeholder='Search' disabled />
					<span className='icon is-left'>
						<i className='fas fa-search' aria-hidden='true'></i>
					</span>
				</p>
			</div>
			<p className='panel-tabs'>
				<span className='is-active'>All</span>
				<span>Public</span>
				<span>Private</span>
			</p>
			<div className='menu'>
				<ul className='menu-list'>
					{data.map((todo) => {
						return <TodoElement {...todo} key={todo.id} />
					})}
				</ul>
			</div>
		</nav>
	)
}

export default TodoListContainer
