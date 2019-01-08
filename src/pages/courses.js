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
			let sectionName = edge.node.frontmatter.name
			acc[dash(sectionName)] = sectionName
			return acc
		}, {})
		let sections = edges.map(edge => {
			let sectionName = edge.node.frontmatter.name
			let sectionId = dash(sectionName)
			return <Section id={sectionId} title={sectionName} key={sectionId} >
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
			filter: { fileAbsolutePath: {regex: "\/content\/courses/"},
								frontmatter: { published: { eq: true } } },
			sort: { order: ASC, fields: [frontmatter___sort]}
		) {
			edges {
				node {
					id
					html
					frontmatter {
						sort
						name
						published
					}
				}
			}
		}
	}
`
