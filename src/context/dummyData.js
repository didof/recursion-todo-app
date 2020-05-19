import { v4 as uuid } from 'uuid'

import modalAction from '../utils/modal/'
import templates from './modalTemplates'

export default {
	modal: modalAction.reset(),
	templates,
	data: [
		{
			id: uuid(),
			title: 'Room 1',
			content: '',
			deleted: false,
			childs: [
				{
					id: uuid(),
					title: 'Room 1.1',
					content: '',
					deleted: false,
					childs: [
						{
							id: uuid(),
							title: 'Room 1.1.1',
							content: '',
							deleted: false,
							childs: [],
						},
						{
							id: uuid(),
							title: 'Room 1.1.2',
							content: '',
							deleted: false,
							childs: [],
						},
					],
				},
				{
					id: uuid(),
					title: 'Room 1.2',
					content: '',
					deleted: false,
					childs: [
						// {
						// 	id: uuid(),
						// 	title: 'Room 1.2.1',
						// 	content: '',
						// 	deleted: false,
						// 	childs: [],
						// },
					],
				},
			],
		},
		{
			id: uuid(),
			title: 'Room 2',
			content: '',
			deleted: false,
			childs: [
				{
					id: uuid(),
					title: 'Room 2.1',
					content: '',
					deleted: false,
					childs: [],
				},
				{
					id: uuid(),
					title: 'Room 2.2',
					content: '',
					deleted: false,
					childs: [],
				},
			],
		},
	],
}
