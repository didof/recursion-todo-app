import Sortable from 'sortablejs'

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

	// 1. check if already found

	// 1. enter the layer
	// 2. if not found => keep searching
	// 3. check every room in this room
	// 4. anytime you enter a room, drop some thread (thread.push(index))
	// 5. if it is this room, set var found to true
	// 6. if not found, look for others doors in the same room
	// 7. if there are not any other doors, remove the last part of the thread
	// 8. if this was the last door on this layer it means that all this layer and everything nested in it do not contain the target, so go back
	// 9. keep on until you find it

	let thread = []
	let found = false
	function AriadneThread(layer, ID) {
		if (found) return // [1]

		// [2]
		layer.forEach((room, index) => {	// [3]
			if (found) return

			thread.push(index)	// [4]

			if (itIsInThisRoom(room, ID)) {	// [5]
				found = true
				return
			}

			if (deadEnd(room)) {	// [6]
				thread.pop()	// [7]

				if (index === layer.length - 1) { // [8]
					thread.pop()
				}
				return
			}

			AriadneThread(room.childs, ID)	// [9]
		})
	}

	function itIsInThisRoom(room, ID) {
		return room.id === ID
	}

	function deadEnd(el) {
		return el.childs.length > 0 ? false : true
	}

	AriadneThread(data, ID)
	console.log(thread)

	let elDragged = data.splice(oldIndex, 1)
	data.splice(newIndex, 0, ...elDragged)
	return data
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
