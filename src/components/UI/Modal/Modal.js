import React, { useContext, useRef, useEffect } from 'react'

import { TodoContext } from '../../../context/TodoContext'

import useToggle from '../../../hooks/useToggle'

import Button from '../Button'

function ModalContainer() {
	// retrieve context
	const {
		state: { modal },
		dispatch,
	} = useContext(TodoContext)

	// manage modal
	const modalRef = useRef()
	useEffect(() => {
		function showModal() {
			modalRef.current.classList.add('is-active')
		}
		function hideModal() {
			modalRef.current.classList.remove('is-active')
		}

		modal.display ? showModal() : hideModal()
	}, [modal.display])

	// functions
	const handle_cancel = (e) => {
		e.stopPropagation()
		dispatch({ type: 'reset_modal' })
	}

	const [option, toggleOption] = useToggle(false)
	const handle_proceed = () => {
		dispatch({
			type: 'proceed_modal',
			payload: modal.target.id,
		})
		if (option) {
			dispatch({ type: 'manage_template', payload: modal.options[0].ref })
		}
	}

	return (
		<div className='modal' ref={modalRef}>
			<div className='modal-background' onClick={handle_cancel}></div>
			<div className='modal-card'>
				<header className='modal-card-head'>
					<p className='modal-card-title'>{modal.title}</p>
					<button
						className='delete'
						aria-label='close'
						onClick={handle_cancel}
					></button>
				</header>
				<section className='modal-card-body'>
					<div className='notification is-info'>
						<p className='has-text-dark is-size-5'>{modal.message}</p>
					</div>
					{modal.options && modal.options.length > 0 && (
						<div className='notification is-secondary'>
							<p className='heading'>Options:</p>
							<ul className='menu-list'>
								{modal.options.map((option, index) => (
									<li key={index}>
										<input type='checkbox' value={option} onChange={toggleOption} />
										<label className='checkbox'>{option.label}</label>
									</li>
								))}
							</ul>
						</div>
					)}
				</section>
				<footer className='modal-card-foot'>
					<Button styles={['success']} click={handle_proceed}>
						Proceed
					</Button>
					<Button click={handle_cancel}>Cancel</Button>
				</footer>
			</div>
		</div>
	)
}

export default ModalContainer
