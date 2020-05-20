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
	animation: 500,
	ghostClass: 'ghost',
}

const nestedConfig = (data) => ({
	group: 'nested',
	animation: 500,
	fallbackOnBody: true,
	swapThreshold: 0.3,
	ghostClass: 'ghost',

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
	// consoleUtils(e)

	if (wasDroppedInSameList(e)) {
		updatedData = getUpdatedData(e, data)
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

function radarPaths(arr) {
	const paths = []
	let path = []

	function sendRadarDeep(layer, path) {
		layer.forEach((room, index) => {
			path.push(index)

			console.log(`visit ${room.title} - path ${path.toString()}`)

			if (room.childs.length > 0) {
				sendRadarDeep(room.childs, path)
			} else {
				paths.push(path)
				path = []
				console.log(`reached bottom - paths ${paths.toString()}`)
			}
		})
	}

	sendRadarDeep(arr, path)
	console.log(paths)
}
