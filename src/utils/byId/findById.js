export const findById = (arr, ID) => {
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