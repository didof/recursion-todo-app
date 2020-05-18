import React, { useContext } from 'react'
import { TodoContext } from '../../context/TodoContext'

// import Checkbox from '../Checkbox/Checkbox'
// import Button from '../UI/Button'

import useToggle from '../../hooks/useToggle'

export default function TodoElement({
	id,
	title,
	content,
	childs,
	depth = 0,
	deleted,
}) {
	const { dispatch } = useContext(TodoContext)

	const [show, toggle] = useToggle()

	const handle_remove = (e, id) => {
		e.stopPropagation()
		dispatch({ type: 'remove_todo', payload: id })
	}

	if (deleted) return null

	return (
		<li
			className='list-item'
			onClick={toggle}
			// style={{ paddingLeft: depth * 20 }}
		>
			<div className='level'>
				<div className='level-left'>
					{/* <p className="heading">public</p> */}
					<p className='title is-size-5 is-italic'>{title}</p>
				</div>
				<div className='level-right buttons'>
					<span
						className='delete is-large'
						onClick={(e) => handle_remove(e, id)}
					></span>
				</div>
			</div>

			<br />
			<span className='is-size-6 has-text-dark'>{content}</span>
			{show && childs.length > 0 && (
				<ul>
					{childs.map((child) => (
						<TodoElement key={child.id} {...child} depth={depth + 1} />
					))}
				</ul>
			)}
		</li>
	)
}
