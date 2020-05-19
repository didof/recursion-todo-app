import Sortable from 'sortablejs'

const defaultConfig = {
	animation: 500,
	ghostClass: 'blue-background-class',
}

const nestedConfig = {
   group: 'nested',
   animation: 150,
   fallbackOnBody: true,
   swapThreshold: 0.65
}

export const buildSortable = (el, config = defaultConfig) => {
   if(config === 'nested') config = nestedConfig
	return new Sortable(el, config)
}
