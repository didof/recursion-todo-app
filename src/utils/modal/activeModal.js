export function activeModal(target, template) {
	return {
		display: true,
		title: template.title,
		message: template.message,
		options: template.options,
		target,
	}
}