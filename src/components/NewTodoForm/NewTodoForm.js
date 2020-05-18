import React, { useEffect, useRef, useContext } from 'react'

import { TodoContext } from '../../context/TodoContext'

import useInput from '../../hooks/useInput'

import Button from '../UI/Button'

function NewTodoForm() {
	const [title, bindTitle, resetTitle] = useInput('')
	const [content, bindContent, resetContent] = useInput('')

	const handle_cancel = () => {
		resetTitle()
		resetContent()
	}

	const { dispatch } = useContext(TodoContext)

	const focusRef = useRef()
	const focus = (el) => el.current.focus()

	useEffect(() => {
		focus(focusRef)
	}, [])

	const handle_add = () => {
		dispatch({ type: 'add_todo', payload: { title, content } })
		handle_cancel()
		focus(focusRef)
	}

	return (
		<div className='box'>
			<div className='field'>
				<label className='label'>Title</label>
				<div className='control'>
					<input className='input' type='text' {...bindTitle} ref={focusRef} />
				</div>
			</div>
			<div className='field'>
				<label className='label'>Content</label>
				<div className='control'>
					<input className='textarea' type='text' {...bindContent} />
				</div>
			</div>
			<div className='buttons is-centered'>
				<Button click={handle_add} styles={['primary']}>
					Add
				</Button>
				<Button click={handle_cancel} styles={['warning', 'squared']}>
					Cancel
				</Button>
			</div>
		</div>
	)
}

export default NewTodoForm
