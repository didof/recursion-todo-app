import React, { useEffect, useRef } from 'react'

function Button({ children, click, styles, abbr }) {
	const btnRef = useRef()
	const slotRef = useRef()
	const abbrRef = useRef()

	useEffect(() => {
		if (styles && styles.length > 0) {
			styles.forEach((style) => {
				btnRef.current.classList.add(`is-${style}`)
			})

			arrContains(styles, 'squared', () =>
				btnRef.current.classList.remove('is-rounded')
			)

			arrContains(styles, 'icon', () => {
				slotRef.current.classList.add('icon', 'is-small')
			})
		}
	}, [styles])

	useEffect(() => {
		if (abbr) {
			abbrRef.current.setAttribute('title', abbr)
			btnRef.current.style = 'cursor: help'
		}
	}, [abbr])

	const slot = <span ref={slotRef}>{children}</span>

	const btnGuts = abbr ? (
		<abbr ref={abbrRef}>
			{slot}
		</abbr>
	) : slot

	return (
		<button className='button is-rounded is-small' onClick={click} ref={btnRef}>
			{btnGuts}
		</button>
	)
}

export default Button

function arrContains(arr, target, cb) {
	if (arr.find((el) => el === target)) cb()
}
