import React from 'react'
import { Link } from 'react-router-dom'

function Header({ title = '' }) {
	return (
		<header className="relative py-6">
			<div className="w-full max-w-6xl px-6 mx-auto">
				<div className="relative flex items-center justify-between">
					<h1 className="m-0 text-xl leading-none uppercase mx-auto" style={{ color: 'white' }}>
                        Opener
					</h1>
				</div>
			</div>
		</header>
	)
}

export default Header
