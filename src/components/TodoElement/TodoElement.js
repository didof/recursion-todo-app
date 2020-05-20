import React, { useEffect, useContext } from 'react'
import { TodoContext } from '../../context/TodoContext'
import { buildSortable } from '../../utils/sortable'

// import Checkbox from '../Checkbox/Checkbox'
import Button from '../UI/Button'

import useToggle from '../../hooks/useToggle'

export default function TodoElement({
	id,
	title,
	content,
	childs,
	depth = 0,
	deleted,
}) {
	const {
		state: { data },
		dispatch,
	} = useContext(TodoContext)

	const [show, toggle] = useToggle()

	const handle_remove = (e, id) => {
		e.stopPropagation()
		dispatch({ type: 'remove_todo', payload: id })
	}

	useEffect(() => {
		const listNested = document.querySelectorAll('.list-nested')
		for (let i = 0; i < listNested.length; i++) {
			buildSortable(listNested[i], 'nested', data)
		}
	}, [data])

	if (deleted) return null

	return (
		<li
			id={id}
			className='list-item matt'
			// style={{ paddingLeft: depth * 20 }}
		>
			<div className='level'>
				<div className='level-left'>
					<abbr title='sort list'>
						<i className='fas fa-arrows-alt' style={{ cursor: 'grab' }}></i>
					</abbr>
					<p className='title is-size-5 is-italic'>{title}</p>
				</div>
				<div className='level-right buttons has-addons'>
					<Button
						click={(e) => handle_remove(e, id)}
						styles={['icon', 'warning', 'outlined']}
						abbr='delete item'
					>
						<i className='fas fa-minus'></i>
					</Button>
					<Button click={toggle} styles={['icon']} abbr='open item'>
						<i className='fas fa-chevron-down'></i>
					</Button>
				</div>
			</div>
			<span className='is-size-6 has-text-dark'>{content}</span>
			{show && childs.length > 0 && (
				<ul className='list-nested' id={`${id}-nested`}>
					{childs.map((child) => (
						<TodoElement key={child.id} {...child} depth={depth + 1} />
					))}
				</ul>
			)}
		</li>
	)
}
