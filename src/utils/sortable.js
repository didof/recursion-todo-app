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
	consoleUtils(e)

	if (wasDroppedInSameList(e)) {
		updatedData = getUpdatedData(e, data)
	}

	saveinSessionStorage(updatedData)
}

function wasDroppedInSameList({ from, to }) {
	return from.id === to.id ? true : false
}

function getUpdatedData({oldIndex, newIndex}, data) {
   // use id to find the depth layer of the list


	let elDragged = data.splice(oldIndex, 1)
   data.splice(newIndex, 0, ...elDragged)
   return data
}

function saveinSessionStorage(updatedData) {
	sessionStorage.setItem('data-sorted', JSON.stringify(updatedData))
}
