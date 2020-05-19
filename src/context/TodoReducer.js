import byId from '../utils/byId/'
import modalAction from '../utils/modal/'
import templates from './modalTemplates'

import todoAction from '../utils/todo/'

export default (state, action) => {
	let template, found, modal

	switch (action.type) {
		case 'reset_modal':
			return { ...state, modal: modalAction.reset() }

		case 'remove_todo':
			template = templates.deleteNestedList

			// check if user disabled this modal, if so act as you would in 'proceed_modal'
			if (template.disabled) {
				return {
					...state,
					modal: modalAction.reset(),
					data: byId.remove(state.data, action.payload),
				}
			}

			// find the target and check if it has nested todos
			found = byId.find(state.data, action.payload)

			// if it has not nested, than just remove it
			if (found.childs.length < 1) {
				return { ...state, data: byId.remove(state.data, action.payload) }
			}

			// since it has nested todos, create and send the modal
			modal = modalAction.active(found, template)

			return { ...state, modal }

		case 'proceed_modal':
			// user has red the modal content and confirmed he wants to proceed

			return {
				...state,
				modal: modalAction.reset(),
				data: byId.remove(state.data, action.payload),
			}

		case 'add_todo':
			const updated = { ...state }
			const todo = todoAction.build({ ...action.payload })

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