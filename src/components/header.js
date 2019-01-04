import { StaticQuery, graphql } from 'gatsby'
import React from 'react'
import Img from "gatsby-image"
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
		<div className="container">
			<div className="columns">
				<div className="column is-half has-text-right">
					<h1 className="title">
						SJDG
					</h1>
					<h2 className="subtitle">
						Some catch phrase
					</h2>
				</div>
				<div className="column is-one-fifth has-text-centered">
					<div className="header-logo">
						<StaticQuery
							query={graphql`
								query {
									logo: file(relativePath: { eq: "logo.png" }) {
										childImageSharp {
											fluid(maxWidth: 600) {
												...GatsbyImageSharpFluid_noBase64
											}
										}
									}
								}
							`}
							render={data => (
								<Img fluid={data.logo.childImageSharp.fluid} critical={true} />
							)}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
}

const FullHeader = ({data}) => {
	return <section className="hero full-header is-fullheight is-primary">
		<HeaderNavigation />
		<HeaderBody />
		<HeaderCarousel />
	</section>
}


const StandardHeader = ({ sections }) => {
	return <section className="hero is-small is-primary">
		<HeaderNavigation />
		<HeaderBody />
		{ sectionNavigation(sections) }
	</section>
}

export default StandardHeader
export { FullHeader }

