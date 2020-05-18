import React from 'react'

function Checkbox({ clicked }) {
	return <input type='checkbox' onChange={clicked} />
}

export default Checkbox
