import { StaticQuery, graphql } from 'gatsby'
import React from 'react'
import { Link } from 'gatsby'
import Img from "gatsby-image"

const NavBarLink = ({to, children}) => {
	return <Link to={to}
							 className="header-link navbar-item"
							 activeClassName="header-link-active">
		{children}
	</Link>
}


const HeaderNavigation = () => {
	return <div className="header-navigation hero-head">
		<header className="navbar">
			<div className="container">
				<div className="navbar-brand">
					<Link to="/" className="navbar-item">
						<StaticQuery
							query={graphql`
								query {
									logo: file(relativePath: { eq: "logo.png" }) {
										childImageSharp {
											fixed(height: 25) {
												...GatsbyImageSharpFixed_noBase64
											}
										}
									}
								}
							`}
							render={data => (
								<Img fixed={data.logo.childImageSharp.fixed} />
							)}
						/>
						<h1>South Jersey Disc Golf</h1>
					</Link>
					<span className="navbar-burger burger" data-target="navbarMenuHeroC">
						<span></span>
						<span></span>
						<span></span>
					</span>
				</div>
				<div id="navbarMenuHeroC" className="navbar-menu is-active">
					<div className="navbar-end">
						<NavBarLink to="/">Home</NavBarLink>
						<NavBarLink to="/about">About</NavBarLink>
						<NavBarLink to="/courses">Courses</NavBarLink>
						<NavBarLink to="/events">Events</NavBarLink>
						<NavBarLink to="/contact">Contact</NavBarLink>
					</div>
				</div>
			</div>
		</header>
	</div>
}

export default HeaderNavigation
