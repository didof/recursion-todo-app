export default {
	deleteNestedList: {
		disabled: false,
		title: 'Delete nested list',
		message:
			'This element has some nested todos. The removal will also be applied to them.',
		options: [
			{
				type: 'checkbox',
				label: 'Do not ask again',
				ref: 'deleteNestedList',
			},
		],
	},
}