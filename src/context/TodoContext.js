import React, { createContext, useReducer } from 'react'
import { v4 as uuid } from 'uuid'

const templates = {
	deleteNestedList: {
		disabled: false,
		title: 'Delete nested list',
		message:
			'This element has some nested todos. The removal will also be applied to them.',
		options: [
			{
				type: 'checkbox',
				label: 'Do not ask again',
				ref: 'deleteNestedList',
			},
		],
	},
}

const initialState = {
	modal: resetModal(),
	templates,
	data: [
		{
			id: uuid(),
			title: 'mother',
			content: 'madre',
			deleted: false,
			childs: [
				{
					id: uuid(),
					title: 'firstborn',
					content: 'primogenito',
					deleted: false,
					childs: [
						{
							id: uuid(),
							title: 'nephew',
							content: 'nipote',
							deleted: false,
							childs: [],
						},
					],
				},
				{
					id: uuid(),
					title: 'second son',
					content: 'secondogenito',
					deleted: false,
					childs: [
						{
							id: uuid(),
							title: 'nephew',
							content: 'nipote',
							deleted: false,
							childs: [],
						},
						{
							id: uuid(),
							title: 'nephew',
							content: 'nipote',
							deleted: false,
							childs: [
								{
									id: uuid(),
									title: 'nephewer',
									content: 'nipote',
									deleted: false,
									childs: [],
								},
							],
						},
					],
				},
			],
		},
		{
			id: uuid(),
			title: 'bachelor',
			content: 'scapolo',
			deleted: false,
			childs: [],
		},
	],
}

const todoReducer = (state, action) => {
	let template, found, modal

	switch (action.type) {
		case 'reset_modal':
			return { ...state, modal: resetModal() }

		case 'remove_todo':
			template = templates.deleteNestedList

			// check if user disabled this modal, if so act as you would in 'proceed_modal'
			if (template.disabled) {
				return {
					...state,
					modal: resetModal(),
					data: removeById(state.data, action.payload),
				}
			}

			// find the target and check if it has nested todos
			found = findById(state.data, action.payload)

			// if it has not nested, than just remove it
			if (found.childs.length < 1) {
				return { ...state, data: removeById(state.data, action.payload) }
			}

			// since it has nested todos, create and send the modal
			modal = activeModal(found, template)

			return { ...state, modal }

		case 'proceed_modal':
			// user has red the modal content and confirmed he wants to proceed

			return {
				...state,
				modal: resetModal(),
				data: removeById(state.data, action.payload),
			}

		case 'add_todo':
			const updated = { ...state }
			const todo = buildTodo({ ...action.payload })

			updated.data.push(todo)

			return updated

		case 'manage_template':
			let copy = { ...state, templates: { ...state.templates } }
			copy.templates[action.payload].disabled = true

			return copy
		case 'use_updated_data':
			return { ...state, data: JSON.parse(action.payload) }
		default:
			return state
	}
}

export const TodoContext = createContext()

function TodoContextProvider({ children }) {
	const [state, dispatch] = useReducer(todoReducer, initialState)

	return (
		<TodoContext.Provider value={{ state, dispatch }}>
			{children}
		</TodoContext.Provider>
	)
}

export default TodoContextProvider

const findById = (arr, ID) => {
	let target = null

	function search(arr, ID) {
		arr.forEach((el) => {
			if (el.id === ID) {
				target = el
				return
			}
			search(el.childs, ID)
		})
	}

	search(arr, ID)
	return target
}

const removeById = (arr, ID) => {
	function search(arr, ID) {
		return arr.map((el) => {
			if (el.id === ID) return { ...el, deleted: true }

			if (el.childs.length === 0) return el

			return { ...el, childs: search(el.childs, ID) }
		})
	}

	return search(arr, ID)
}

function activeModal(target, template) {
	return {
		display: true,
		title: template.title,
		message: template.message,
		options: template.options,
		target,
	}
}

function resetModal() {
	return {
		display: false,
		title: '',
		message: '',
		options: [],
		target: null,
	}
}

function buildTodo({ title, content }) {
	return {
		id: uuid(),
		title,
		content,
		deleted: false,
		childs: [],
	}
}
