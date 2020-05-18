import React, { useEffect, useRef } from 'react'

function Button({ children, click, styles }) {
	const btnRef = useRef()
	useEffect(() => {
		if (styles && styles.length > 0) {
			styles.forEach((style) => {
				btnRef.current.classList.add(`is-${style}`)
			})

			if(styles.find(style => style === 'squared')) {
				btnRef.current.classList.remove('is-rounded')
			}
		}
	}, [styles])

	return (
		<button className='button is-rounded' onClick={click} ref={btnRef}>
			{children}
		</button>
	)
}

export default Button
