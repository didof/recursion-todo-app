import { v4 as uuid } from 'uuid'

import modalAction from '../utils/modal/'
import templates from './modalTemplates'

export default {
	modal: modalAction.reset(),
	templates,
	data: [
		{
			id: uuid(),
			title: 'mother',
			content: 'madre',
			deleted: false,
			childs: [
				{
					id: uuid(),
					title: 'firstborn',
					content: 'primogenito',
					deleted: false,
					childs: [
						{
							id: uuid(),
							title: 'nephew',
							content: 'nipote',
							deleted: false,
							childs: [],
						},
					],
				},
				{
					id: uuid(),
					title: 'second son',
					content: 'secondogenito',
					deleted: false,
					childs: [
						{
							id: uuid(),
							title: 'nephew',
							content: 'nipote',
							deleted: false,
							childs: [],
						},
						{
							id: uuid(),
							title: 'nephew',
							content: 'nipote',
							deleted: false,
							childs: [
								{
									id: uuid(),
									title: 'nephewer',
									content: 'nipote',
									deleted: false,
									childs: [],
								},
							],
						},
					],
				},
			],
		},
		{
			id: uuid(),
			title: 'bachelor',
			content: 'scapolo',
			deleted: false,
			childs: [],
		},
	],
}