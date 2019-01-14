import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Header from '../components/header'
import Section from '../components/section'

const dash = (string) =>
	string.replace(/\s+/g, '-').toLowerCase()

export default ({data}) => {
	if (data.allMarkdownRemark) {
		let edges = data.allMarkdownRemark.edges
		let headers = edges.reduce((acc, edge) => {
			let sectionTitle = edge.node.frontmatter.title
			acc[dash(sectionTitle)] = sectionTitle
			return acc
		}, {})
		let sections = edges.map(edge => {
			let sectionTitle = edge.node.frontmatter.title
			let sectionId = dash(sectionTitle)
			return <Section id={sectionId} title={sectionTitle} key={sectionId} >
				<div dangerouslySetInnerHTML={{ __html: edge.node.html }}></div>
			</Section>
		})
		return <Layout title="About">
			<Header sections={headers} />
			{sections}
		</Layout>
	} else {
		return <Layout title="About">
			<Header />
			<p>Coming soon</p>
		</Layout>
	}
}

export const pageQuery = graphql`
	query {
		allMarkdownRemark(
			filter: { fileAbsolutePath: {regex: "\/content\/about/"},
								frontmatter: { published: { eq: true } } },
			sort: { order: ASC, fields: [frontmatter___sort]}
		) {
			edges {
				node {
					id
					html
					frontmatter {
						sort
						title
						published
					}
				}
			}
		}
	}
`
