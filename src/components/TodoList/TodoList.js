import React, { useEffect, useContext, use } from 'react'
import { TodoContext } from '../../context/TodoContext'
import { buildSortable } from '../../utils/sortable'

import TodoElement from '../TodoElement/TodoElement'
import Button from '../UI/Button'

function TodoListContainer() {
	useEffect(() => {
		const dataSaved = localStorage.getItem('data-sorted')
		if (dataSaved) {
			dispatch({ type: 'use_updated_data', payload: dataSaved })
		}

		const el = document.getElementById('container-nested')
		buildSortable(el, 'nested', data)
	}, [])

	// must stay after componentDidMount or it will flash with default data
	const {
		state: { data },
		dispatch,
	} = useContext(TodoContext)

	const handle_save = () => {
		// check if in sessionStorage there is the key 'data-sorted'
		const dataSorted = sessionStorage.getItem('data-sorted')
		if (dataSorted) {
			// y: copy the data from sessionStorage to localStorage
			localStorage.setItem('data-sorted', dataSorted)
		} else {
			// n: the user did not sort the list, so nothing have to be saved => do nothing (maybe show a modal that explains how to sort?)
		}
	}

	return (
		<nav className='panel'>
			<p className='panel-heading'>Todos</p>
			<div className='panel-block'>
				<p className='control has-icons-left'>
					<input className='input' type='text' placeholder='Search' disabled />
					<Button className='button' styles={['primary']} click={handle_save}>
						Save
					</Button>

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
				<ul className='menu-list' id='container-nested'>
					{data.map((todo) => {
						return <TodoElement {...todo} key={todo.id} />
					})}
				</ul>
			</div>
		</nav>
	)
}

export default TodoListContainer
