import { v4 as uuid } from 'uuid'

export function buildTodo({ title, content }) {
	return {
		id: uuid(),
		title,
		content,
		deleted: false,
		childs: [],
	}
}