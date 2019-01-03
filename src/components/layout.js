import React from 'react'

import SEO from './seo'
import '../styles/all.scss'

const Layout = ({ title, children }) =>
	<>
		<SEO title={title} keywords={[`jersey`, `disc`, `golf`]} />
		{children}
	</>

export default Layout
