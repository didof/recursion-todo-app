// 1. check if already found
// 2. if not found => keep searching
// 3. check every room in this layer
// 4. anytime you enter a room, drop some thread (thread.push(index))
// 5. if it is this room, set var found to true
// 6. if not found, look for others doors in the same room
// 7. if there are not any other doors, remove the last part of the thread
// 8. if this was the last door on this layer it means that all this layer and everything nested in it do not contain the target, so go back
// 9. keep on until you find it

function itIsInThisRoom(room, ID) {
	return room.id === ID
}

function deadEnd(el) {
	return el.childs.length > 0 ? false : true
}

export function generateThread(layer, ID) {
	let thread = []
	let found = false

	function AriadneThread(layer, ID) {
		if (found) return // [1]

		// [2]
		layer.forEach((room, index) => {
			// [3]
			if (found) return

			thread.push(index) // [4]

			if (itIsInThisRoom(room, ID)) {
				// [5]
				found = true
				return
			}

			if (deadEnd(room)) {
				// [6]
				thread.pop() // [7]

				if (index === layer.length - 1) {
					// [8]
					thread.pop()
				}
				return
			}

			AriadneThread(room.childs, ID) // [9]
		})
	}

	AriadneThread(layer, ID)

	return thread
}

export function findAndInject(data, thread, oldIndex, newIndex) {
	let threadCopy = [...thread]

	let updatedLayer

	function iterate(data, thread) {
		thread.shift()

		if (thread.length > 0) {
			iterate(data[thread[0]].childs, thread)
		} else {
			updatedLayer = setNewOrder(data, oldIndex, newIndex)
		}
	}
	iterate(data, thread)

	return injectUpdatedLayer(updatedLayer, data, threadCopy)
}

function setNewOrder(layer, oldIndex, newIndex) {
	let elDragged = layer.splice(oldIndex, 1)
	layer.splice(newIndex, 0, ...elDragged)
	return layer
}

function injectUpdatedLayer(updatedLayer, data, thread) {

	function findLayer(layer, pos) {
		thread.shift()
		if(thread.length < 1) {
			layer = updatedLayer
			return
		}

		const entered = layer[thread[pos]]

		findLayer(entered.childs, pos)
	}
	findLayer(data, 0)

	return data
}
