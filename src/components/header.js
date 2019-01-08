import { StaticQuery, graphql } from 'gatsby'
import React from 'react'
import HeaderNavigation from './header-navigation'
import HeaderCarousel from './header-carousel'

const sectionNavigation = (sections) => {
	let sectionLinks = Object.entries(sections || {}).map(([ref, title]) => {
		let href = `#${ref}`;
		return <li key={ref}>
			<a href={href}>
				{title}
			</a>
		</li>
	})

	return <div className="hero-foot">
		<nav className="tabs is-boxed is-fullwidth">
			<div className="container">
				<ul>
					{ sectionLinks }
				</ul>
			</div>
		</nav>
	</div>
}


const HeaderBody = () => {
	return <div className="header-body hero-body">
	<div className="container has-text-centered">
			<StaticQuery
				query={graphql`
					query {
						logo: file(relativePath: { eq: "logo.png" }) {
							childImageSharp {
								fixed(width: 400) {
									...GatsbyImageSharpFixed
								}
							}
						}
					}
				`}
				render={data => (
					<img src={data.logo.childImageSharp.fixed.src} className="header-logo" alt="SJDG" />
				)}
			/>
		</div>
	</div>
}

const FullHeader = ({data}) => {
	return <section className="hero header-container header-full is-fullheight">
		<HeaderNavigation />
		<HeaderBody />
		<HeaderCarousel />
	</section>
}


const StandardHeader = ({ sections }) => {
	return <section className="hero header-container header-short is-small">
		<HeaderNavigation />
		{ sectionNavigation(sections) }
	</section>
}

export default StandardHeader
export { FullHeader }

