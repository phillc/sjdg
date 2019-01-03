import React from 'react'

import SEO from './seo'
import '../styles/all.scss'

const Layout = ({ title, children }) =>
	<>
		<SEO title={title} keywords={[`jersey`, `disc`, `golf`]} />
		<div>
			{children}
			<footer>
				© 2019
			</footer>
		</div>
	</>

export default Layout
