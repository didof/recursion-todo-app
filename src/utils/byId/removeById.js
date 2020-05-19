export const removeById = (arr, ID) => {
	function search(arr, ID) {
		return arr.map((el) => {
			if (el.id === ID) return { ...el, deleted: true }

			if (el.childs.length === 0) return el

			return { ...el, childs: search(el.childs, ID) }
		})
	}

	return search(arr, ID)
}