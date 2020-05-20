import Sortable from 'sortablejs'

import { generateThread, findAndInject } from './todo/ariadneThread'

function consoleUtils(e) {
	console.log('who:' + e.item.id)
	console.log('from', e.from)
	console.log('to', e.to)
	console.log('oldIndex', e.oldIndex)
	console.log('newIndex', e.newIndex)
}

const defaultConfig = {
	animation: 200,
	ghostClass: 'ghost',
}

const nestedConfig = (data) => ({
	group: 'nested',
	animation: 300,
	fallbackOnBody: true,
	swapThreshold: 0.9,
	ghostClass: 'ghost',
	handle: '.fa-arrows-alt',
	
	onSort: (e) => updateState(e, data),
})

export const buildSortable = (el, config, data) => {
	switch (config) {
		case 'nested':
			config = nestedConfig(data)
			break
		default:
			config = defaultConfig
	}
	return new Sortable(el, config)
}

const updateState = (e, data) => {
	let updatedData

	if (wasDroppedInSameList(e)) {
		updatedData = getUpdatedData(e, data)
	} else {
		consoleUtils(e)
		console.log('in una altra lista')
	}

	saveinSessionStorage(updatedData)
}

function wasDroppedInSameList({ from, to }) {
	return from.id === to.id ? true : false
}

function getUpdatedData({ oldIndex, newIndex, item }, data) {
	const ID = item.id

	const thread = generateThread(data, ID)

	return findAndInject(data, thread, oldIndex, newIndex)
}

function saveinSessionStorage(updatedData) {
	sessionStorage.setItem('data-sorted', JSON.stringify(updatedData))
}