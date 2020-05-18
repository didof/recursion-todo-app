import React from 'react'

import Modal from './Modal/Modal'
import Title from '../Title/Title'

function Layout({ children }) {
	return (
		<>
			<Modal />
			<Title />
			<div className='container'>
				<main>{children}</main>
			</div>
		</>
	)
}

export default Layout
